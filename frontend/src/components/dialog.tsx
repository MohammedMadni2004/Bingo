import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog"
  type DialogProps={
    description:string|null;
  }
const DialogBox:React.FC<DialogProps>=({description})=>{
    console.log(description);
    const isOpen=true;

    return(
        <>
        <Dialog open={isOpen}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Are you absolutely sure?</DialogTitle>
      <DialogDescription>
        {description}
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>

        </>

    )
}
export default DialogBox;