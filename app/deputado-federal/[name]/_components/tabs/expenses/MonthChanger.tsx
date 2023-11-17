import React, { useState } from "react";
import { useRouter, useSearchParams, useParams } from "next/navigation";
import { Button } from "@nextui-org/react";

interface Props {
  changeDateHandler: (newDate: {
    numericMonth: string;
    fullMonth: string;
    year: string;
  }) => void;
}

export const MonthChanger = ({ changeDateHandler }: Props) => {
  const router = useRouter();

  const searchParams = useSearchParams();

  const routeQueryMonth = searchParams!.get("mes");
  const routeQueryYear = searchParams!.get("ano");

  const params = useParams();
  const federalDeputyNameAndId = params!.name;

  const [displayDate, setDisplayDate] = useState(
    getInitialDisplayDate(routeQueryYear, routeQueryMonth),
  );

  const changeDateMonthByOffset = (offset: number): void => {
    const newDate = new Date(displayDate);
    newDate.setMonth(newDate.getMonth() + offset);
    setDisplayDate(newDate);

    router.push(
      `${federalDeputyNameAndId}?&mes=${(newDate.getMonth() + 1)
        .toString()
        .padStart(2, "0")}&ano=${newDate.getFullYear()}`,
    );

    changeDateHandler({
      numericMonth: (newDate.getMonth() + 1).toString().padStart(2, "0"),
      fullMonth: newDate.toLocaleString("default", { month: "long" }),
      year: newDate.getFullYear().toString(),
    });
  };

  return (
    <div className="flex justify-center items-center p-4  ">
      <Button
        size="sm"
        className=""
        onClick={() => changeDateMonthByOffset(-1)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-6 w-6 text-gray-600"
        >
          <path
            fillRule="evenodd"
            d="M11.03 3.97a.75.75 0 010 1.06l-6.22 6.22H21a.75.75 0 010 1.5H4.81l6.22 6.22a.75.75 0 11-1.06 1.06l-7.5-7.5a.75.75 0 010-1.06l7.5-7.5a.75.75 0 011.06 0z"
            clipRule="evenodd"
          />
        </svg>
      </Button>

      <div className="mx-4 text-lg text-center">
        {" em "}{" "}
        <u>
          {displayDate?.toLocaleString("default", { month: "long" })} {"de "}
          {displayDate?.getFullYear()}
        </u>
      </div>

      {getIsDisplayDateUpToSameMonthOfNow(displayDate) && (
        <Button
          size="sm"
          className=""
          onClick={() => changeDateMonthByOffset(1)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-6 w-6 text-gray-600"
          >
            <path
              fillRule="evenodd"
              d="M12.97 3.97a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 11-1.06-1.06l6.22-6.22H3a.75.75 0 010-1.5h16.19l-6.22-6.22a.75.75 0 010-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </Button>
      )}
    </div>
  );
};

function getInitialDisplayDate(
  year: string | undefined | null,
  month: string | undefined | null,
): Date {
  if (!year && !month) {
    const currentDate = new Date();
    return currentDate;
  }

  const monthIndex = parseInt(month!) - 1; // jan: 0 / dec: 11
  return new Date(parseInt(year!), monthIndex);
}

function getIsDisplayDateUpToSameMonthOfNow(displayDate: Date): boolean {
  const displayDatePlusOneMonth = new Date(displayDate);
  displayDatePlusOneMonth.setMonth(displayDatePlusOneMonth.getMonth() + 1);

  const currentDate = new Date();
  return displayDatePlusOneMonth <= currentDate;
}

export default MonthChanger;
