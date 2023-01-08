import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import allLocales from "@fullcalendar/core/locales-all";
import { Grid } from "@mui/material";
import { StyleWrapper } from "./VoyageDatePicker.styles";
import subStractDate from "../../utils/substractDate";

interface VoyageDataProps {
  allVoyages?: any;
  handleEventClick?: any;
  voyages?: any;
  setIsOpenModal?: any;
}

export default function VoyageDatePicker({
  allVoyages,
  handleEventClick,
  voyages,
  setIsOpenModal,
}: VoyageDataProps) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Grid marginTop="2rem">
        <StyleWrapper>
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            locales={allLocales}
            locale="tr"
            editable={true}
            // select={handleDateSelect}
            selectable={true}
            events={voyages}
            eventClick={(e: any) => {
              handleEventClick(e.event._def.extendedProps);
              const date = e.event.start.toLocaleDateString("tr-TR");
              const date1 = date.split(".").reverse().join("-");
              const date2 = subStractDate(date1);
              if (date2 < 0) {
                setIsOpenModal(true);
              } else {
                setIsOpenModal(false);
              }
            }}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay",
            }}
          />
        </StyleWrapper>
      </Grid>
    </>
  );
}
