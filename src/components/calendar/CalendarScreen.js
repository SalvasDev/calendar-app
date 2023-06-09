import React, { useState } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'


import Navbar from '../ui/Navbar'
import { messages } from '../../helpers/calendar-messages-es'
import CalendarEvent from './CalendarEvent'
import CalendarModal from './CalendarModal'

import 'react-big-calendar/lib/css/react-big-calendar.css'
import 'moment/locale/es'
import { useDispatch, useSelector } from 'react-redux'
import { uiOpenModal } from '../../actions/ui'
import { eventClearActiveEvent, eventSetActive } from '../../actions/events'
import AddNewFab from '../ui/AddNewFab'
import DeleteEventFab from '../ui/DeleteEventFab'



moment.locale('es')
const localizer = momentLocalizer(moment) // or globalizeLocalizer


const CalendarScreen = () => {

  const dispatch = useDispatch();
    const { events, activeEvent } = useSelector ( state => state.calendar)

  const [ lastView, setLastView ] = useState( localStorage.getItem('lastView') || 'month')

  const onDoubleClick = (e) => {
    dispatch( uiOpenModal() )

  }

  const onSelectEvent = (e) => {
    dispatch( eventSetActive (e) )
  }

  const onViewChange = (e) => {
    setLastView(e)
   localStorage.setItem('lastView', e)
  }

  const onSelectedSlot = (e) => {
    dispatch(eventClearActiveEvent())
  }


  const eventStyleGetter = (event, start, end, isSelected) => {

    const style = {
      backgroundColor: '#367CF7',
      borderRadius: '0px',
      opacity: 0.8,
      display: 'block',   
      color: 'white'
    }

    return {
      style
    }
  }

  return (
    <div className="calendar-screen">
      <Navbar />

      <Calendar
      localizer={localizer}
      events={events}
      startAccessor="start"
      endAccessor="end"
      messages={messages}
      eventPropGetter= { eventStyleGetter}
      onDoubleClickEvent={ onDoubleClick}
      onView = { onViewChange }
      onSelectEvent = {onSelectEvent}
      view= {lastView}
      onSelectSlot= {onSelectedSlot}
      selectable={true}
      components={{
        event: CalendarEvent
      }}
    /> 

    <AddNewFab />
    {
      (activeEvent) && <DeleteEventFab />
    }    
    <CalendarModal />

    </div>
  )
}

export default CalendarScreen
