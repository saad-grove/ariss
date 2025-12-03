import { registerPanelUser } from "@/api/panel-user-api";
import type { AddPanelUserType } from "@/types/panel-user-types";
import { useOrganization, useUser } from "@clerk/clerk-react";
import { useEffect } from "react";

const Dashboard = () => {
  const { user } = useUser();
  const { organization } = useOrganization();

  // Find the user's membership in the current organization
  const userMembership = user?.organizationMemberships.find(
    (membership) => membership.organization.id === organization?.id
  );

  // Get the role key string from the membership
  const userRole = userMembership?.role;

  const role = userRole === "org:admin" ? "ADMIN" : "EMPLOYEE";

  useEffect(() => {
    const handleAddPanelUser = async () => {
      const payload: AddPanelUserType = {
        clerkId: user?.id!,
        email: user?.emailAddresses[0].emailAddress!,
        fullname: user?.fullName!,
        role,
      };
      try {
        await registerPanelUser(payload);
        console.log(JSON.stringify(payload));
        console.log("New panel user registered");
      } catch (error) {
        console.log("Panel user already exists");
      }
    };

    handleAddPanelUser();
  }, []);

  return <div>Dashboard</div>;
};

export default Dashboard;
