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
import { string } from "yup";

interface VoyageDataProps {
  allVoyages?: any;
  handleEventClick?: any;
  voyages?: any;
}

export default function VoyageDatePicker({
  allVoyages,
  handleEventClick,
  voyages,
}: VoyageDataProps) {
  console.log(allVoyages);
  const [date, setDate] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);

  console.log(voyages);
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
            events={voyages}
            eventClick={(e: any) => {
              handleEventClick(e.event._def.extendedProps),
                console.log(e.event._def.extendedProps);
            }}
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
