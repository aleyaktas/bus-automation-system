import { VoyageDatePickerStyleProps } from "./VoyageDatePicker.types";
import styled from "@emotion/styled";

const styleFn: VoyageDatePickerStyleProps = () => ({});

export default styleFn;

export const StyleWrapper = styled.div`
  .fc-button.fc-prev-button,
  .fc-button.fc-next-button,
  .fc-button.fc-today-button,
  .fc-button.fc-button-primary {
    background: white;
    color: black;
    background-image: none;
  }
  button.fc-today-button.fc-button.fc-button-primary {
    background: white;
    color: black;
  }
  ,
  .fc-view-harness.fc-view-harness-active {
    background-color: none;
  }
  ,
  .fc.fc-media-screen.fc-direction-ltr.fc-theme-standard {
    width: 50rem;
    height: 50rem;
  }
  ,
  .fc-daygrid-body.fc-daygrid-body-unbalanced {
    width: auto;
  }
  ,
  .fc.fc-media-screen.fc-direction-ltr.fc-theme-standard {
    background-color: cadetblue;
    opacity: 0.8;
    // border-radius: 2rem;
    overflow: auto;
    box-shadow: rgb(0 0 0 / 24%) 0px 3px 8px;
  }
  ,
  .fc .fc-daygrid-day.fc-day-today {
    background-color: white !important;
    color: black !important;
  }
  ,
  .fc .fc-scrollgrid-liquid {
    // border: none;
  }
  .fc .fc-toolbar.fc-header-toolbar {
    padding: 1rem;
  }
  .css-162geup .fc-view-harness.fc-view-harness-active {
    height: auto;
  }
  ,
  td {
    // border: none !important;
  }
`;
