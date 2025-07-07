import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default async function AccountPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  const {
    email,
    user_metadata: { avatar_url, full_name } = {},
    app_metadata: { provider } = {},
  } = user;

  const displayData = {
    Email: email,
    "Full Name": full_name,
    Provider: provider,
  };

  const userInitial = (full_name || email || "U").charAt(0).toUpperCase();

  return (
    <main className='container mx-auto py-8 px-4 max-w-4xl'>
      <Card>
        <CardHeader className='border-b'>
          <div className='flex flex-col items-center text-center gap-4 w-full py-4'>
            <Avatar className='h-14 w-14'>
              <AvatarImage
                src={avatar_url || ""}
                alt={`${full_name || "User"}'s avatar`}
              />
              <AvatarFallback className='text-xl sm:text-2xl'>
                {userInitial}
              </AvatarFallback>
            </Avatar>
            <div className='space-y-1'>
              <CardTitle className='text-2xl'>{full_name || "User"}</CardTitle>
              <CardDescription className='text-base'>{email}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className='p-0'>
          <Table className='border-separate border-spacing-0'>
            <TableHeader className='bg-muted/50'>
              <TableRow className='hover:bg-muted/60'>
                <TableHead className='w-[200px] text-left bg-muted/20'>
                  Field
                </TableHead>
                <TableHead className='text-left pl-4'>Value</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Object.entries(displayData).map(([key, value], index) => (
                <TableRow
                  key={key}
                  className={`${
                    index % 2 === 0 ? "bg-background" : "bg-muted/20"
                  } hover:bg-muted/40 transition-colors`}
                >
                  <TableCell className='py-3 bg-muted/10 text-muted-foreground'>
                    <span>{key}</span>
                  </TableCell>
                  <TableCell className='py-3 pl-4 font-semibold text-foreground'>
                    {value || (
                      <span className='text-muted-foreground italic'>
                        Not provided
                      </span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </main>
  );
}
