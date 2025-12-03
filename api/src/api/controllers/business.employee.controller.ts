import BusinessEmployee from "../services/BusinessEmployee";
import { Request, Response } from "express";

const businessEmployee = new BusinessEmployee();

export const registerEmployeeController = async (
  req: Request,
  res: Response
) => {
  const { email, phone, name, role, dealerId, otp } = req.body;
  const data = { email, phone, name, role, dealerId, otp };

  if (!data) {
    return res.status(500).json({ message: "Fields are missing" });
  }

  try {
    const employee = await businessEmployee.registerEmployee(
      email,
      phone,
      name,
      role,
      dealerId,
      otp
    );
    res.status(201).json({
      message: `${employee.role} account has registered`,
      data: employee,
    });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getAllTechniciansController = async (
  _req: Request,
  res: Response
) => {
  try {
    const employee = await businessEmployee.getAllTechnicians();
    res.status(200).json({ total: employee.length, data: employee });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllBackofficeController = async (
  _req: Request,
  res: Response
) => {
  try {
    const employee = await businessEmployee.getAllBackoffice();
    res.status(200).json({ total: employee.length, data: employee });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
