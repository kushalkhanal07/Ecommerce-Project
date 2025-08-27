import { AppDataSource } from '../config/database';
import { Admin } from '../entities';
import { User } from '../entities/user';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export const registerAdmin = async(req:Request,res:Response)=>{
    const admin = AppDataSource.getRepository(Admin);
    const { name, email, password, phoneNumber } = req.body;

    try{
          if(!name || !email || !password || !phoneNumber){
              return res.status(400).send({
                  success: false,
                  message: "All fields are required"
              });
          }

          const existingUser = await admin.findOne({
            where:{
              email: email
            }
          })
          if (existingUser) {
              return res.status(409).send({
                  success: false,
                  message: "User with this email already exists"
              });
          }

          const newAdmin = admin.create({
              name,
              email,
              password,
              PhoneNumber: phoneNumber
          });

          await admin.save(newAdmin);
          return res.status(201).send({
              success: true,
              message: "Admin registered successfully"
          });
      }
    catch(err){
      return res.status(500).send({
        success: false,
        message: "Internal server error"
      });
    }
  }
  export const loginAdmin = async(req:Request,res:Response)=>{
    const admin = AppDataSource.getRepository(Admin);
    const { email, password } = req.body;

    try {
      if (!email || !password) {
        return res.status(400).send({
          success: false,
          message: "Email and password are required"
        });
      }

      const existingAdmin = await admin.findOne({
        where: {
          email: email
        }
      });

      if (!existingAdmin) {
        return res.status(401).send({
          success: false,
          message: "Invalid email or password"
        });
      }

      // Here you would normally compare the password with a hashed password
      if (existingAdmin.password !== password) {
        return res.status(401).send({
          success: false,
          message: "Invalid email or password"
        });
      }
      const token = jwt.sign(
        { id: existingAdmin.id },
        process.env.JWT_SECRET as string,
        { expiresIn: "1h" }
      );
      return res.status(200).send({
        success: true,
        message: "Admin logged in successfully",
        admin: {
          id: existingAdmin.id,
          email: existingAdmin.email,
          name: existingAdmin.name,
          phoneNumber: existingAdmin.PhoneNumber
        },
        token: token
      });
    } catch (err) {
      return res.status(500).send({
        success: false,
        message: "Internal server error"
      });
    }
  }
