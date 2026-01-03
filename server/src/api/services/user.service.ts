import User from "../../model/User";

export const registerDealer = async (
  name: string,
  email: string,
  phone: string,
  password: string,
  gstin: string,
  business: string,
  billingAddress: {
    pincode: string;
    state: string;
    city: string;
    localAddress: string;
  },
  shippingAddress: {
    pincode: string;
    state: string;
    city: string;
    localAddress: string;
  }
) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    phone,
    password,
    gstin,
    business,
    billingAddress,
    shippingAddress,
    role: "dealer",
  });

  return user;
};
