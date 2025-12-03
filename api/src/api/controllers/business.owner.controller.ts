import BusinessOwner from "../services/BusinessOwner";
import { Request, Response } from "express";

const businessOwnerServices = new BusinessOwner();

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
    const owner = await businessOwnerServices.registerOwner(
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

export const fetchAllApprovedController = async (
  _req: Request,
  res: Response
) => {
  try {
    const owner = await businessOwnerServices.fetchAllApproved();
    res.status(200).json({ total: owner.length, data: owner });
  } catch (error: any) {
    res.status(500);
    console.log("There was an error fetching users", error.message);
  }
};

export const fetchAllNonApprovedController = async (
  _req: Request,
  res: Response
) => {
  try {
    const owner = await businessOwnerServices.fetchAllNonApproved();
    res.status(200).json({ total: owner.length, data: owner });
  } catch (error: any) {
    res.status(500);
    console.log("There was an error fetching users", error.message);
  }
};

export const updateOwnerAddressController = async (
  req: Request,
  res: Response
) => {
  const { email } = req.params;
  const { billingAddress, shippingAddress } = req.body;

  if (!email) {
    res.status(404);
    console.log("Email not found in params");
  }

  if (!billingAddress || !shippingAddress) {
    res.status(500);
    console.log("Billing and Shipping address are missing keys or values");
  }

  try {
    const owner = await businessOwnerServices.updateOwnerAddress(
      shippingAddress,
      billingAddress,
      email
    );

    res.status(200).json({ message: "Business address updated", data: owner });
  } catch (error: any) {
    res.status(400);
    console.log("There was an error updating address", error.message);
  }
};

export const deleteCustomerController = async (req: Request, res: Response) => {
  const { email } = req.params;

  if (!email) {
    res.status(404);
    console.log("Email not found in params");
  }

  try {
    const owner = await businessOwnerServices.deleteCustomer(email);
    res.status(200).json({ message: `Business ${owner.business} deleted` });
  } catch (error: any) {
    res.status(400);
    console.log("There was an error updating address", error.message);
  }
};

export const approveOwnerController = async (req: Request, res: Response) => {
  const { email } = req.params;

  if (!email) {
    return res.status(404).json({ message: "Email not found in params" });
  }

  try {
    const customer = await businessOwnerServices.approveOwner(email);
    res.status(200).json({ message: "Dealer approved", data: customer });
  } catch (error: any) {
    res.status(400);
    console.log("There was an error approving dealer", error.message);
  }
};

export const disapproveOwnerController = async (
  req: Request,
  res: Response
) => {
  const { email } = req.params;

  if (!email) {
    return res.status(404).json({ message: "Email not found in params" });
  }

  try {
    const customer = await businessOwnerServices.disapproveOwner(email);
    res.status(200).json({ message: "Dealer disapproved", data: customer });
  } catch (error: any) {
    res.status(400);
    console.log("There was an error disapproving dealer", error.message);
  }
};
