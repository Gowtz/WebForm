import { EmailList } from "./Mail/EmailList";
import Navbar from "./Navbar";

export default function Mail() {
  return (
    <div className="w-full h-full min-h-screen p-5">
      <Navbar h1="Mail" h3="Your recent Mails" />
      <EmailList />
    </div>
  );
}
