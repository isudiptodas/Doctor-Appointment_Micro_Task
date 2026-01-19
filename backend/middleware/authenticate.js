import jwt from 'jsonwebtoken';
import express from 'express';
import { arcjet } from '../config/arcjetSecurity.js';
import { isSpoofedBot } from "@arcjet/inspect";

export const authenticate = async (req, res, next) => {

  const decision = await arcjet.protect(req, { requested: 5 }); 

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        return res.status(429).json({
        success: false,
        message: 'Too many request'
       });
     }
      else if (decision.reason.isBot()) {
        return res.status(403).json({
        success: false,
        message: 'Bot detected'
      });
     }
      else {
        return res.status(403).json({
        success: false,
        message: 'Forbidden'
      });
    }
 }
  
  const token = req.cookies.token;

  if(!token){
    return res.status(403).json({
      success: false,
      message: 'token missing'
    });
  }

  const roleRoutes = {
    'USER' : '/api/user',
    'DOCTOR' : '/api/doctor',
    'HOSPITAL' : '/api/hospital',
  };

  try{
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const role = decoded.role;
    req.userData = decoded;

    if(req.path.startsWith(roleRoutes[role])){
      next();
    }
    
    return res.status(403).json({
      success: false,
      message: 'Unauthorized'
    });
  }
  catch(err){
    console.log(err);
    return res.status(505).json({
      success: false,
      message: 'Error validating token'
    });
  }
}

