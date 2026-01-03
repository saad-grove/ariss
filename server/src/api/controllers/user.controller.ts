import { Request, Response } from "express";
import * as userService from "../services/user.service";

export const registerDealerController = async (req: Request, res: Response) => {
  const {
    name,
    email,
    phone,
    password,
    gstin,
    business,
    billingAddress,
    shippingAddress,
  } = req.body;

  try {
    const dealer = await userService.registerDealer(
      name,
      email,
      phone,
      password,
      gstin,
      business,
      billingAddress,
      shippingAddress
    );
    return res.status(201).json(dealer);
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};
