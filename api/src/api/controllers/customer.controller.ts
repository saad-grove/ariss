import { Request, Response } from "express";
import Customer from "../services/Customer";

const customerServices = new Customer();

export const registerOwnerController = async (req: Request, res: Response) => {
  const {
    email,
    phone,
    name,
    gstin,
    business,
    shippingAddress,
    billingAddress,
    otp,
  } = req.body;

  if (
    !email ||
    !phone ||
    !name ||
    !gstin ||
    !business ||
    !shippingAddress ||
    !billingAddress
  ) {
    res.status(500);
    console.log("All fields are required");
  }

  try {
    const owner = await customerServices.registerOwner(
      email,
      phone,
      name,
      gstin,
      business,
      shippingAddress,
      billingAddress,
      otp
    );

    res
      .status(201)
      .json({ message: "Business account has been registered", data: owner });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const loginUserController = async (req: Request, res: Response) => {
  const { email, otp } = req.body;
  try {
    const { user, token } = await customerServices.loginUser(email, otp);
    res
      .status(200)
      .json({ message: "Logged In", user: user.name, token: token });
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

export const getProfileController = async (req: Request, res: Response) => {
  try {
    if (!(req as any).user) {
      res.status(401).json({ message: "Unauthorized: No user found" });
      return;
    }
    const user = await customerServices.getProfile((req as any).user.id);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json(user);
  } catch (error: any) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
};
