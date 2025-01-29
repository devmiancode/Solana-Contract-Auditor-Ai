"use client"

import * as React from "react"
import { format } from "date-fns"

import { cn } from "@/lib/utils"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface DatePickerProps {
  id?: string;
  selected: Date | null;
  onSelect: (date: Date | undefined) => void;
  minDate: Date;
  className?: string;
  options?: { value: string; label: string; }[];
}

export function DatePicker({ id, selected, onSelect, minDate, className, options }: DatePickerProps) {
  const [date, setDate] = React.useState<Date | undefined>(selected || undefined)
  const [day, setDay] = React.useState(selected ? selected.getUTCDate().toString().padStart(2, '0') : new Date().getUTCDate().toString().padStart(2, '0'))
  const [month, setMonth] = React.useState(selected ? (selected.getUTCMonth() + 1).toString().padStart(2, '0') : (new Date().getUTCMonth() + 1).toString().padStart(2, '0'))
  const [year, setYear] = React.useState(selected ? selected.getUTCFullYear().toString() : new Date().getUTCFullYear().toString())
  const [hour, setHour] = React.useState<string>("")
  const [minute, setMinute] = React.useState<string>("")
  const [currentServerTime, setCurrentServerTime] = React.useState(new Date())

  const months = [
    { value: "01", label: "January" },
    { value: "02", label: "February" },
    { value: "03", label: "March" },
    { value: "04", label: "April" },
    { value: "05", label: "May" },
    { value: "06", label: "June" },
    { value: "07", label: "July" },
    { value: "08", label: "August" },
    { value: "09", label: "September" },
    { value: "10", label: "October" },
    { value: "11", label: "November" },
    { value: "12", label: "December" }
  ]

  const getDaysInMonth = (month: number, year: number) => {
    if (month === 2) {
      return isLeapYear(year) ? 29 : 28
    }
    return [4, 6, 9, 11].includes(month) ? 30 : 31
  }

  const isLeapYear = (year: number) => {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0)
  }

  const years = Array.from(
    { length: 50 }, 
    (_, i) => (new Date().getFullYear() + i).toString()
  )

  const days = Array.from(
    { length: getDaysInMonth(parseInt(month), parseInt(year)) },
    (_, i) => (i + 1).toString().padStart(2, '0')
  )

  const hours = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'))
  const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'))

  // Actualizar el tiempo del servidor cada segundo
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentServerTime(new Date())
      
      // Verificar si la hora actual se ha vuelto inválida
      if (hour && minute && day && month && year) {
        const testDate = new Date(
          parseInt(year),
          parseInt(month) - 1,
          parseInt(day),
          parseInt(hour),
          parseInt(minute)
        )
        
        if (!isDateValid(testDate)) {
          setHour("")
          setMinute("")
          setDate(undefined)
          onSelect(undefined)
        }
      }
    }, 1000)
    return () => clearInterval(interval)
  }, [hour, minute, day, month, year])

  const isDateValid = (testDate: Date) => {
    const currentTime = new Date()
    testDate = new Date(testDate)
    
    // Si no hay hora seleccionada, solo validamos la fecha
    if (!hour || !minute) {
      return testDate.getFullYear() > currentTime.getFullYear() ||
        (testDate.getFullYear() === currentTime.getFullYear() &&
          (testDate.getMonth() > currentTime.getMonth() ||
            (testDate.getMonth() === currentTime.getMonth() &&
              testDate.getDate() > currentTime.getDate()))) ||
        // Si es el mismo día, permitir seleccionar
        (testDate.getFullYear() === currentTime.getFullYear() &&
          testDate.getMonth() === currentTime.getMonth() &&
          testDate.getDate() === currentTime.getDate())
    }
    
    // Para comparación de hora, usar getTime()
    testDate.setSeconds(0, 0)
    currentTime.setSeconds(0, 0)
    
    return testDate.getTime() >= currentTime.getTime()
  }

  const getValidDays = () => {
    const daysInMonth = getDaysInMonth(parseInt(month), parseInt(year))
    return Array.from(
      { length: daysInMonth },
      (_, i) => {
        const day = (i + 1).toString().padStart(2, '0')
        const testDate = new Date(
          parseInt(year),
          parseInt(month) - 1,
          i + 1,
          hour ? parseInt(hour) : 0,
          minute ? parseInt(minute) : 0
        )
        return { value: day, disabled: !isDateValid(testDate) }
      }
    )
  }

  const getValidMonths = () => {
    return months.map(m => {
      const testDate = new Date(
        parseInt(year),
        parseInt(m.value) - 1,
        parseInt(day),
        hour ? parseInt(hour) : 0,
        minute ? parseInt(minute) : 0
      )
      return { ...m, disabled: !isDateValid(testDate) }
    })
  }

  const getValidYears = () => {
    return years.map(y => {
      const testDate = new Date(
        parseInt(y),
        parseInt(month) - 1,
        parseInt(day),
        hour ? parseInt(hour) : 0,
        minute ? parseInt(minute) : 0
      )
      return { value: y, disabled: !isDateValid(testDate) }
    })
  }

  const getValidHours = () => {
    if (!day || !month || !year) return hours.map(h => ({ value: h, disabled: true }))
    
    const currentTime = new Date()
    const isToday = parseInt(year) === currentTime.getFullYear() &&
                    parseInt(month) - 1 === currentTime.getMonth() &&
                    parseInt(day) === currentTime.getDate()
    
    return hours.map(h => {
      const testDate = new Date(
        parseInt(year),
        parseInt(month) - 1,
        parseInt(day),
        parseInt(h),
        minute ? parseInt(minute) : 0
      )
      
      // Si es hoy, deshabilitar solo las horas que ya pasaron
      if (isToday && parseInt(h) < currentTime.getHours()) {
        return { value: h, disabled: true }
      }
      
      return { value: h, disabled: !isDateValid(testDate) }
    })
  }

  const getValidMinutes = () => {
    if (!day || !month || !year || !hour) return minutes.map(m => ({ value: m, disabled: true }))
    
    const currentTime = new Date()
    const isCurrentHour = parseInt(year) === currentTime.getFullYear() &&
                         parseInt(month) - 1 === currentTime.getMonth() &&
                         parseInt(day) === currentTime.getDate() &&
                         parseInt(hour) === currentTime.getHours()
    
    return minutes.map(m => {
      const testDate = new Date(
        parseInt(year),
        parseInt(month) - 1,
        parseInt(day),
        parseInt(hour),
        parseInt(m)
      )
      
      // Si es la hora actual, deshabilitar solo los minutos que ya pasaron
      if (isCurrentHour && parseInt(m) <= currentTime.getMinutes()) {
        return { value: m, disabled: true }
      }
      
      return { value: m, disabled: !isDateValid(testDate) }
    })
  }

  const updateDate = (newDay?: string, newMonth?: string, newYear?: string, newHour?: string, newMinute?: string) => {
    const d = newDay || day
    const m = newMonth || month
    const y = newYear || year
    const h = newHour || hour
    const min = newMinute || minute

    const maxDays = getDaysInMonth(parseInt(m), parseInt(y))
    const adjustedDay = parseInt(d) > maxDays ? maxDays.toString().padStart(2, '0') : d

    const newDate = new Date(
      parseInt(y),
      parseInt(m) - 1,
      parseInt(adjustedDay),
      h ? parseInt(h) : 0,
      min ? parseInt(min) : 0
    )

    if (isDateValid(newDate)) {
      setDate(newDate)
      onSelect(newDate)
      if (parseInt(d) > maxDays) {
        setDay(adjustedDay)
      }
    } else {
      // Si la fecha es inválida, resetear la hora y minutos
      setHour("")
      setMinute("")
      setDate(undefined)
      onSelect(undefined)
    }
  }

  React.useEffect(() => {
    if (selected && selected !== date) {
      setDay(selected.getUTCDate().toString().padStart(2, '0'))
      setMonth((selected.getUTCMonth() + 1).toString().padStart(2, '0'))
      setYear(selected.getUTCFullYear().toString())
      setHour(selected.getUTCHours().toString().padStart(2, '0'))
      setMinute(selected.getUTCMinutes().toString().padStart(2, '0'))
    }
  }, [selected])

  return (
    <div className="flex items-start w-full gap-1">
      <div className="flex gap-1 w-full">
        <Select value={day} onValueChange={(value) => { setDay(value); updateDate(value); }}>
          <SelectTrigger className="flex-1 bg-black/50 border-blue-400 border-opacity-30 text-blue-400 text-center justify-center">
            <SelectValue placeholder="Day" className="text-center" />
          </SelectTrigger>
          <SelectContent 
            position="popper" 
            side="bottom" 
            align="start" 
            sideOffset={5} 
            alignOffset={0}
            avoidCollisions={false}
            className="bg-black border-blue-400 border-opacity-30 max-h-[200px]"
          >
            {getValidDays().map(({ value: d, disabled }) => (
              <SelectItem 
                key={d} 
                value={d} 
                disabled={disabled}
                className={cn(
                  "text-blue-400 flex items-center justify-center h-[35px] pl-[10px] -ml-[10px]",
                  disabled && "opacity-50 cursor-not-allowed"
                )}
              >
                {d}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={month} onValueChange={(value) => { setMonth(value); updateDate(undefined, value); }}>
          <SelectTrigger className="flex-1 bg-black/50 border-blue-400 border-opacity-30 text-blue-400 text-center justify-center">
            <SelectValue placeholder="Month" className="text-center" />
          </SelectTrigger>
          <SelectContent 
            position="popper" 
            side="bottom" 
            align="start" 
            sideOffset={5} 
            alignOffset={0}
            avoidCollisions={false}
            className="bg-black border-blue-400 border-opacity-30"
          >
            {getValidMonths().map(({ value, label, disabled }) => (
              <SelectItem 
                key={value} 
                value={value} 
                disabled={disabled}
                className={cn(
                  "text-blue-400 flex items-center justify-center h-[35px] pl-[10px] -ml-[10px]",
                  disabled && "opacity-50 cursor-not-allowed"
                )}
              >
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={year} onValueChange={(value) => { setYear(value); updateDate(undefined, undefined, value); }}>
          <SelectTrigger className="flex-1 bg-black/50 border-blue-400 border-opacity-30 text-blue-400 text-center justify-center">
            <SelectValue placeholder="Year" className="text-center" />
          </SelectTrigger>
          <SelectContent 
            position="popper" 
            side="bottom" 
            align="start" 
            sideOffset={5} 
            alignOffset={0}
            avoidCollisions={false}
            className="bg-black border-blue-400 border-opacity-30 max-h-[200px]"
          >
            {getValidYears().map(({ value: y, disabled }) => (
              <SelectItem 
                key={y} 
                value={y} 
                disabled={disabled}
                className={cn(
                  "text-blue-400 flex items-center justify-center h-[35px] pl-[10px] -ml-[10px]",
                  disabled && "opacity-50 cursor-not-allowed"
                )}
              >
                {y}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={hour} onValueChange={(value) => { setHour(value); updateDate(undefined, undefined, undefined, value); }}>
          <SelectTrigger className="flex-1 bg-black/50 border-blue-400 border-opacity-30 text-blue-400 text-center justify-center">
            <SelectValue placeholder="Hour" className="text-center" />
          </SelectTrigger>
          <SelectContent 
            position="popper" 
            side="bottom" 
            align="start" 
            sideOffset={5} 
            alignOffset={0}
            avoidCollisions={false}
            className="bg-black border-blue-400 border-opacity-30 max-h-[200px]"
          >
            {getValidHours().map(({ value: h, disabled }) => (
              <SelectItem 
                key={h} 
                value={h} 
                disabled={disabled}
                className={cn(
                  "text-blue-400 flex items-center justify-center h-[35px] pl-[10px] -ml-[10px]",
                  disabled && "opacity-50 cursor-not-allowed"
                )}
              >
                {h}h
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={minute} onValueChange={(value) => { setMinute(value); updateDate(undefined, undefined, undefined, undefined, value); }}>
          <SelectTrigger className="flex-1 bg-black/50 border-blue-400 border-opacity-30 text-blue-400 text-center justify-center">
            <SelectValue placeholder="Min" className="text-center" />
          </SelectTrigger>
          <SelectContent 
            position="popper" 
            side="bottom" 
            align="start" 
            sideOffset={5} 
            alignOffset={0}
            avoidCollisions={false}
            className="bg-black border-blue-400 border-opacity-30 max-h-[200px]"
          >
            {getValidMinutes().map(({ value: m, disabled }) => (
              <SelectItem 
                key={m} 
                value={m} 
                disabled={disabled}
                className={cn(
                  "text-blue-400 flex items-center justify-center h-[35px] pl-[10px] -ml-[10px]",
                  disabled && "opacity-50 cursor-not-allowed"
                )}
              >
                {m}m
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

