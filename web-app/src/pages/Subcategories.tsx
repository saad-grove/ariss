import AddSubcategory from "@/_components/Subcategory/AddSubcategory";
import DeleteSubcategory from "@/_components/Subcategory/DeleteSubcategory";
import UpdateSubcategory from "@/_components/Subcategory/UpdateSubcategory";
import { fetchAllSubcategories } from "@/api/subcategory-api";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { FetchSubcategoryInterface } from "@/types/subcategory-types";
import { Filter, Info, Loader2, MoreHorizontal, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Subcategories = () => {
  const [data, setData] = useState<FetchSubcategoryInterface[]>([]);
  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const itemsPerPage = 10;

  const filteredData = data.filter((subcategory) =>
    subcategory.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const getAllSubcategories = async () => {
    setLoading(true);
    try {
      const res = await fetchAllSubcategories();
      console.log(res.data.data);
      setData(res.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllSubcategories();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  if (loading) {
    return (
      <div className="flex justify-center items-center w-full min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:gap-y-6 justify-center items-center w-full lg:px-6 lg:py-10">
      <div className="flex justify-between items-center w-full lg:mb-0 mb-6 ">
        <div className="flex justify-start items-center lg:gap-x-2 border pr-3 py-2 shadow rounded">
          <input
            className="w-[300px] lg:placeholder:text-sm placeholder:text-xs lg:text-sm text-xs pl-2 focus:outline-none focus:ring-0"
            placeholder="Search subcategories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="w-4 h-4 text-muted-foreground" />
          <Tooltip>
            <TooltipTrigger asChild>
              <Info className="w-3 h-3 text-muted-foreground" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Total Subcategories: {data.length}</p>
            </TooltipContent>
          </Tooltip>
        </div>
        <div className="flex justify-start items-center lg:gap-x-4">
          <AddSubcategory onSuccess={getAllSubcategories} />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant={"outline"}>
                <Filter />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40 font-work" align="end">
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <Link className="hover:underline" to="/categories">
                    Categories
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link className="hover:underline" to="/products">
                    Products
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <Table className="text-left border">
        <TableHeader>
          {tableHeading.map((heading, idx) => (
            <TableHead key={idx} className="text-white">
              {heading.title}
            </TableHead>
          ))}
          <TableHead className="text-white text-right">Actions</TableHead>
        </TableHeader>
        {paginatedData.length === 0 ? (
          <TableBody>
            <TableRow>
              <TableCell
                colSpan={tableHeading.length + 1}
                className="text-center align-middle h-24"
              >
                No available subcategories
              </TableCell>
            </TableRow>
          </TableBody>
        ) : (
          <TableBody>
            {paginatedData.map((subcategory, idx) => (
              <TableRow
                key={subcategory.id}
                className={idx % 2 === 0 ? "bg-muted-foreground/10" : ""}
              >
                <TableCell>{idx + 1}</TableCell>
                <TableCell>{subcategory.title}</TableCell>
                <TableCell>{subcategory.category.title}</TableCell>
                <TableCell className="truncate">
                  {subcategory.description ? subcategory.description : "N/A"}
                </TableCell>
                <TableCell>
                  <img
                    src={subcategory.image}
                    alt={subcategory.title}
                    width={42}
                    height={42}
                  />
                </TableCell>
                <TableCell className="flex justify-end">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <MoreHorizontal className="w-4 h-4 cursor-pointer" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-40 font-work" align="end">
                      <DropdownMenuLabel className="font-semibold">
                        Actions
                      </DropdownMenuLabel>
                      <DropdownMenuGroup className="mt-2">
                        <UpdateSubcategory
                          subcategoryId={subcategory.id}
                          onSuccess={getAllSubcategories}
                        />
                        <DeleteSubcategory
                          subcategoryId={subcategory.id}
                          onSuccess={getAllSubcategories}
                        />
                        <DropdownMenuItem disabled>Download</DropdownMenuItem>
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        )}
      </Table>

      <div>
        {paginatedData.length !== 0 && (
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                />
              </PaginationItem>
              {Array.from({ length: totalPages }).map((_, index) => (
                <PaginationItem key={index}>
                  <PaginationLink
                    isActive={currentPage === index + 1}
                    onClick={() => setCurrentPage(index + 1)}
                  >
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>
    </div>
  );
};

const tableHeading = [
  {
    title: "Sr No.",
  },
  {
    title: "Title",
  },
  {
    title: "Category",
  },
  {
    title: "Description",
  },
  {
    title: "Image",
  },
];

export default Subcategories;
