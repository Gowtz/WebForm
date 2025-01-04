import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const emails = [
  {
    id: "1",
    projectName: "Project Alpha",
    formName: "User Feedback",
    sender: "John Doe",
    time: "10:30 AM",
    preview: "Just a quick reminder about our team meeting at 2 PM today...",
  },
  {
    id: "2",
    projectName: "Project Beta",
    formName: "Bug Reports",
    sender: "Jane Smith",
    time: "11:45 AM",
    preview:
      "I've completed the first phase of the project. Here are the details...",
  },
  {
    id: "3",
    projectName: "Project Gamma",
    formName: "Feature Requests",
    sender: "Mike Johnson",
    time: "1:15 PM",
    preview: "Hey team, anyone up for lunch at the new Italian place nearby?",
  },
  {
    id: "4",
    projectName: "Project Delta",
    formName: "Customer Support",
    sender: "Sarah Williams",
    time: "3:00 PM",
    preview:
      "I just got off the phone with the client. They loved our presentation!",
  },
  {
    id: "5",
    projectName: "Project Epsilon",
    formName: "Team Activities",
    sender: "Alex Brown",
    time: "4:30 PM",
    preview:
      "Hey everyone, I'm organizing a hiking trip this weekend. Who's in?",
  },
];

export function EmailList() {
  return (
    <div className="space-y-4">
      <Table>
        <TableCaption>Your Recent Emails Across Projects</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[150px]">Project</TableHead>
            <TableHead className="w-[150px]">Form</TableHead>
            <TableHead className="w-[150px]">Sender</TableHead>
            <TableHead>Preview</TableHead>
            <TableHead className="w-[100px] text-right">Time</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {emails.map((email) => (
            <TableRow
              key={email.id}
              className="group hover:bg-muted/50 cursor-pointer"
            >
              <TableCell className="font-medium">{email.projectName}</TableCell>
              <TableCell>{email.formName}</TableCell>
              <TableCell>{email.sender}</TableCell>
              <TableCell className="truncate max-w-[300px]">
                {email.preview}
              </TableCell>
              <TableCell className="text-right text-muted-foreground">
                {email.time}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
