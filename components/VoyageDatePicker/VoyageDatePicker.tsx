import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import allLocales from "@fullcalendar/core/locales-all";
import { Grid } from "@mui/material";
import { StyleWrapper } from "./VoyageDatePicker.styles";
import BuyTicketModal from "../modals/BuyTicketModal/BuyTicketModal";
import VoyageDetailModal from "../modals/VoyageDetailModal/VoyageDetailModal";

export default function VoyageDatePicker() {
  const [date, setDate] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    console.log(date);
  }, [date]);

  const handleDateSelect = (selectInfo: any) => {
    `Tıklanılan Tarih ${selectInfo.startStr} `;
    setDate(selectInfo.startStr);
    setIsOpen(true);
  };
  return (
    <>
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
        <VoyageDetailModal isOpen={isOpen} setIsOpen={setIsOpen} />
      </Grid>
    </>
  );
}
