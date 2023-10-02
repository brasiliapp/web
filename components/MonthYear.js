import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Button } from "@nextui-org/react";

const MonthYear = ({ onDateChange, total }) => {
  const router = useRouter();
  const { ano, mes } = router.query;

  const [displayedDate, setDisplayedDate] = useState(null);
  console.log("displayedDate", displayedDate);
  const currentDate = new Date();

  useEffect(() => {
    if (!ano && !mes && displayedDate === null) {
      setDisplayedDate(currentDate);
    } else {
      const monthIndex = mes - 1; // jan: 0 / dec: 11
      setDisplayedDate(new Date(ano, monthIndex));
    }
  }, []);

  const goToMonth = (offset) => {
    const newDate = new Date(displayedDate);
    newDate.setMonth(newDate.getMonth() + offset);

    if (newDate.getMonth() === 12 && offset === 1) {
      newDate.setFullYear(newDate.getFullYear() + 1);
      newDate.setMonth(0);
    } else if (newDate.getMonth() === -1 && offset === -1) {
      newDate.setFullYear(newDate.getFullYear() - 1);
      newDate.setMonth(11);
    }

    setDisplayedDate(newDate);

    router.push(
      `/deputado-federal/${router.query.name}?mes=${(newDate.getMonth() + 1)
        .toString()
        .padStart(2, "0")}&ano=${newDate.getFullYear()}`,
    );

    return onDateChange({
      numericMonth: (newDate.getMonth() + 1).toString().padStart(2, "0"),
      fullMonth: newDate.toLocaleString("default", { month: "long" }),
      year: newDate.getFullYear(),
    });
  };

  const nextMonth = new Date(displayedDate);
  nextMonth.setMonth(nextMonth.getMonth() + 1);
  const showNextMonthButton = nextMonth <= currentDate;

  return (
    <div className="flex justify-center items-center p-4  ">
      <Button size="sm" className="" onClick={() => goToMonth(-1)}>
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
          {displayedDate?.toLocaleString("default", { month: "long" })} {"de "}
          {displayedDate?.getFullYear()}
        </u>
      </div>

      {showNextMonthButton && (
        <Button size="sm" className="" onClick={() => goToMonth(1)}>
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

export default MonthYear;
