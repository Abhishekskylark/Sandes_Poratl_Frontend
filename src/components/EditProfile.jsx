import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Edit } from "lucide-react";
import { useRef } from "react";

const EditProfile = () => {

    const inputRef = useRef(null);
    
      const openFile = () => {
        inputRef.current?.click();
      };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="bg-transparent border-2 text-gray-600 hover:text-black cursor-pointer"
        >
            <Edit/>
          Edit Profile
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Your Sandes profile</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="profilephoto" className="text-left">
              Profile Photo
            </Label>
            <Avatar onClick={openFile} className="w-30 h-30 rounded-full cursor-pointer">
              <AvatarImage src="https://github.com/shadcn.png"/>
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <input ref={inputRef} type="file" className="hidden" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" value="Pedro Duarte" className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" variant="outline" className="bg-transparent border-2 text-gray-600 hover:text-black cursor-pointer">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfile;
