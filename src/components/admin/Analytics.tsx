import { useState } from "react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { DatePickerWithRange } from "../ui/date-range-picker";
import useSWR from "swr";
import { format, subDays } from "date-fns";
import { DateRange } from "react-day-picker";
import { UserCog, Users } from "lucide-react";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

function Loader() {
  return (
    <div className="flex flex-row gap-2 items-center">
      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
      <p className="text-lg font-bold">Loading</p>
    </div>
  );
}

export default function Analytics() {
  const [date, setDate] = useState<DateRange | undefined>({
    from: subDays(new Date(), 30),
    to: new Date(),
  });

  const range = date
    ? `${format(date.from || new Date(), "yyyy-MM-dd")},${format(
        date.to || new Date(),
        "yyyy-MM-dd",
      )}`
    : null;

  const {
    data: newUsers,
    error: newUserError,
    isLoading: newUserLoading,
  } = useSWR<number>(
    `/api/analytics/new-users${range ? "?range=" + range : ""}`,
    fetcher,
  );

  const {
    data: suppliers,
    error: supplierError,
    isLoading: supplierLoading,
  } = useSWR<{ verified: number; notVerified: number }>(
    `/api/analytics/suppliers${range ? "?range=" + range : ""}`,
    fetcher,
  );

  return (
    <>
      <div className="flex-col flex">
        <div className="flex-1 space-y-6">
          <div className="flex items-center justify-between space-y-2 flex-col lg:flex-row">
            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
            <div className="flex items-center space-x-2">
              <DatePickerWithRange date={date} setDate={setDate} />
              {range ? (
                <Button onClick={() => setDate(undefined)}>Lifetime</Button>
              ) : (
                <Button
                  onClick={() =>
                    setDate({
                      from: subDays(new Date(), 30),
                      to: new Date(),
                    })
                  }
                >
                  This month
                </Button>
              )}
              <Button className="bg-green-700 hover:bg-green-800">
                Download
              </Button>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Users</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                {newUserLoading ? (
                  <Loader />
                ) : newUserError ? (
                  <div className="text-2xl font-bold">
                    Failed to load, try again later
                  </div>
                ) : newUsers ? (
                  <>
                    <div className="text-2xl font-bold">{newUsers} </div>
                    <p className="text-xs text-muted-foreground">
                      {range
                        ? `new user${newUsers !== 1 ? "s" : ""} from the specified range`
                        : `total user${newUsers !== 1 ? "s" : ""}`}
                    </p>
                  </>
                ) : (
                  <div className="text-2xl font-bold">No data available</div>
                )}
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Suppliers</CardTitle>
                <UserCog className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                {supplierLoading ? (
                  <Loader />
                ) : supplierError ? (
                  <div className="text-2xl font-bold">
                    Failed to load, try again later
                  </div>
                ) : suppliers ? (
                  <>
                    <div className="text-2xl font-bold">
                      {suppliers.verified}{" "}
                      <span className="text-base font-normal">
                        supplier{suppliers.verified !== 1 ? "s" : ""} verified
                      </span>
                    </div>
                    <div className="text-2xl font-bold">
                      {suppliers.notVerified}{" "}
                      <span className="text-base font-normal">
                        supplier{suppliers.notVerified !== 1 ? "s" : ""} not
                        verified
                      </span>
                    </div>
                  </>
                ) : (
                  <div className="text-2xl font-bold">No data available</div>
                )}
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Sales</CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <rect width="20" height="14" x="2" y="5" rx="2" />
                  <path d="M2 10h20" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+12,234</div>
                <p className="text-xs text-muted-foreground">
                  +19% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Active Now
                </CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+573</div>
                <p className="text-xs text-muted-foreground">
                  +201 since last hour
                </p>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Overview</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">{/* <Overview /> */}</CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Recent Sales</CardTitle>
                <CardDescription>
                  You made 265 sales this month.
                </CardDescription>
              </CardHeader>
              <CardContent>{/* <RecentSales /> */}</CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
