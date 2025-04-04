import { Package, Plus } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardTitle } from "../ui/card";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import InstantMeshConverter from "./3dModelBuilder";

export default function EmptyState() {
  return (
    <>
      <Card className="border-dashed border-2 border-slate-200 dark:border-slate-800">
        <CardContent className="flex flex-col items-center justify-center py-12">
          <div className="rounded-full bg-slate-100 dark:bg-slate-800 p-3 mb-4">
            <Package className="h-10 w-10 text-slate-400" />
          </div>
          <CardTitle className="text-xl mb-2 text-center">No products found</CardTitle>
          <p className="text-slate-500 dark:text-slate-400 text-center mb-6 max-w-md">
            You haven't added any products to this list yet. Create your first product to get started.
          </p>
          
          <Sheet>
            <SheetTrigger asChild>
              <Button className="flex items-center">
                <Plus className="mr-2 h-4 w-4" />
                Add Product
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Add New Product</SheetTitle>
                <SheetDescription>
                  Fill in the details to add a new product to your list.
                </SheetDescription>
              </SheetHeader>
              
              {/* Your form content goes here */}
              <div className="py-4">
                {/* Add your form inputs here */}
                <InstantMeshConverter/>
              </div>
              
              <SheetFooter>
                <SheetClose asChild>
                  <Button variant="outline">Cancel</Button>
                </SheetClose>
                <Button>Save Product</Button>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </CardContent>
      </Card>
    </>
  );
}