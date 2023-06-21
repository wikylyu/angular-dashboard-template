import startOfMonth from 'date-fns/startOfMonth';
import endOfMonth from 'date-fns/endOfMonth';
import startOfYesterday from 'date-fns/startOfYesterday';
import endOfYesterday from 'date-fns/endOfYesterday';
import startOfToday from 'date-fns/startOfToday';
import startOfTomorrow from 'date-fns/startOfTomorrow';
import addMonths from 'date-fns/addMonths';
import endOfToday from 'date-fns/endOfToday';
import startOfYear from 'date-fns/startOfYear';
import endOfYear from 'date-fns/endOfYear';
import addYears from 'date-fns/addYears';

export function formatRangeDate(ranges: any[]): any[] {
  let startTime = null;
  let endTime = null;
  if (ranges.length > 0) {
    const t = new Date(ranges[0]);
    t.setHours(0);
    t.setMinutes(0);
    t.setSeconds(0);
    startTime = t.toISOString();
  }
  if (ranges.length > 1) {
    const t = new Date(ranges[1]);
    t.setHours(24);
    t.setMinutes(0);
    t.setSeconds(0);
    endTime = t.toISOString();
  }
  return [startTime, endTime];
}

export function defaultRanges() {
  const now = new Date();

  return {
    今天: [startOfToday(), endOfToday()],
    昨天: [startOfYesterday(), endOfYesterday()],
    本月: [startOfMonth(new Date()), endOfMonth(new Date())],
    上月: [
      startOfMonth(addMonths(new Date(), -1)),
      endOfMonth(addMonths(new Date(), -1)),
    ],
    今年: [startOfYear(now), endOfYear(now)],
    去年: [startOfYear(addYears(now, -1)), endOfYear(addYears(now, -1))],
  };
}

export function parseDateRangesWithDefault(s: string, def: any) {
  if (!s) {
    return def;
  }
  const dates = s.split(',');
  if (dates.length !== 2) {
    return def;
  }
  const d1 = new Date(dates[0]);
  const d2 = new Date(dates[1]);
  if (isNaN(d1.getTime()) || isNaN(d2.getTime())) {
    return def;
  }
  return [d1, d2];
}

export function parseDateWithDefault(s: string, def: any) {
  if (!s) {
    return def;
  }
  const d = new Date(s);
  if (!d.getTime()) {
    return def;
  }
  return d;
}
