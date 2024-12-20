"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import { ScrollArea } from "@/components/ui/scroll-area";
import useSWR from "swr";
import { format, subDays } from "date-fns";
import { DateRange } from "react-day-picker";
import {
  AreaChartIcon as ChartArea,
  UserCog,
  Package,
  Download,
} from "lucide-react";

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

  const range = useMemo(
    () =>
      date
        ? `${format(date.from || new Date(), "yyyy-MM-dd")},${format(
            date.to || new Date(),
            "yyyy-MM-dd",
          )}`
        : null,
    [date],
  );

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

  const {
    data: products,
    error: productError,
    isLoading: productLoading,
  } = useSWR<{ verified: number; notVerified: number }>(
    `/api/analytics/products${range ? "?range=" + range : ""}`,
    fetcher,
  );

  const {
    data: topSuppliers,
    error: topSupplierError,
    isLoading: topSupplierLoading,
  } = useSWR<
    {
      productCount: number;
      businessName: string | undefined;
      businessLocation: string | undefined;
    }[]
  >(`/api/analytics/top-suppliers${range ? "?range=" + range : ""}`, fetcher);

  const handleDownload = async () => {
    const response = await fetch("/api/analytics/download", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        dateRequested: new Date().toLocaleString(),
        range: range ?? "lifetime",
        newUsers: newUsers ?? 0,
        suppliers: suppliers,
        products: products,
        topSuppliers: topSuppliers,
      }),
    });
    if (!response.ok) {
      console.error("Failed to download file");
      return;
    }
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `rawmats_analytics_${new Date().toISOString()}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <ScrollArea className="h-full">
      <div className="space-y-6 p-4 md:p-6">
        <div className="flex flex-col space-y-4 md:flex-row md:justify-between md:items-center">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
            Dashboard
          </h2>
          <div className="flex flex-wrap gap-2">
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
            <Button
              onClick={handleDownload}
              className="bg-green-700 hover:bg-green-800"
            >
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <AnalyticsCard
            title="Users"
            icon={<ChartArea className="h-4 w-4 text-muted-foreground" />}
            loading={newUserLoading}
            error={newUserError}
            data={newUsers ?? 0}
            range={range}
          />
          <AnalyticsCard
            title="Suppliers"
            icon={<UserCog className="h-4 w-4 text-muted-foreground" />}
            loading={supplierLoading}
            error={supplierError}
            data={suppliers ?? 0}
            range={range}
          />
          <AnalyticsCard
            title="Products"
            icon={<Package className="h-4 w-4 text-muted-foreground" />}
            loading={productLoading}
            error={productError}
            data={products ?? 0}
            range={range}
          />
        </div>

        <Card className="col-span-1 md:col-span-2 lg:col-span-3">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base font-medium">
              Top Suppliers
              <span className="ml-2 text-xs font-normal text-muted-foreground">
                {range ? "from the specified range" : "lifetime top suppliers"}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {topSupplierLoading ? (
              <Loader />
            ) : topSupplierError ? (
              <div className="text-sm font-medium">
                Failed to load, try again later
              </div>
            ) : topSuppliers && topSuppliers.length > 0 ? (
              <div className="space-y-4">
                {topSuppliers.map((supplier, index) => (
                  <div
                    key={index}
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between text-sm"
                  >
                    <div className="flex-grow mb-1 sm:mb-0">
                      <div className="font-medium">{supplier.businessName}</div>
                      <a
                        className="text-xs text-muted-foreground underline break-all"
                        href={supplier.businessLocation}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {supplier.businessLocation}
                      </a>
                    </div>
                    <div className="text-right font-medium">
                      {supplier.productCount} products
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-sm font-medium">No data available</div>
            )}
          </CardContent>
        </Card>
      </div>
    </ScrollArea>
  );
}

interface AnalyticsCardProps {
  title: string;
  icon: React.ReactNode;
  loading: boolean;
  error: Error;
  data: number | { verified: number; notVerified: number };
  range: string | null;
}

function AnalyticsCard({
  title,
  icon,
  loading,
  error,
  data,
  range,
}: AnalyticsCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        {loading ? (
          <Loader />
        ) : error ? (
          <div className="text-sm font-medium">
            Failed to load, try again later
          </div>
        ) : data ? (
          <div>
            <div className="text-2xl font-bold">
              {typeof data === "number" ? data : data.verified}
            </div>
            {typeof data !== "number" && (
              <div className="text-xs text-muted-foreground">
                {data.notVerified} not verified
              </div>
            )}
            <p className="text-xs text-muted-foreground">
              {range
                ? `from the specified range`
                : `total ${title.toLowerCase()}`}
            </p>
          </div>
        ) : (
          <div className="text-sm font-medium">No data available</div>
        )}
      </CardContent>
    </Card>
  );
}
