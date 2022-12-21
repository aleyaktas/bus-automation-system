import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import allLocales from "@fullcalendar/core/locales-all";
import { Grid } from "@mui/material";
import { StyleWrapper } from "./VoyageDatePicker.styles";

export default function Calendar() {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    console.log(date);
  }, [date]);

  const handleDateSelect = (selectInfo: any) => {
    alert(`Tıklanılan Tarih ${selectInfo.startStr} `);
    setDate(selectInfo.startStr);
  };
  return (
    <Grid marginTop="2rem">
      <StyleWrapper>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          locales={allLocales}
          locale="tr"
          editable={true}
          select={handleDateSelect}
          selectable={true}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
        />
      </StyleWrapper>
    </Grid>
  );
}
