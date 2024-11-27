import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
type DialogProps = {
  description: string | null;
};
const DialogBox: React.FC<DialogProps> = ({ description }) => {
  const isOpen = true;
  let dialogTitle;
  let dialogDescription;
  if (description === "HOORAH!! U WON") {
    dialogTitle = "U WON";
    dialogDescription = "HOORAH!! U WON";
  } else if (description === "BAD LUCK!! OTHER PLAYER WON") {
    dialogTitle = "loose";
    dialogDescription = "BAD LUCK!! U LOOSE";
  }
  return (
    <>
      <Dialog open={isOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{dialogTitle}</DialogTitle>
            <DialogDescription>{dialogDescription}</DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};
export default DialogBox;
