export type DateFormatOptions = {
  locale: string;
  dateFormatOptions: Intl.DateTimeFormatOptions;
}

const longDate: Partial<Intl.DateTimeFormatOptions> = {
  timeZone: 'UTC',
  year: 'numeric',
  month: 'long',
  day: '2-digit',
};

const formatDate = (dateValue: string | null, options?: Partial<DateFormatOptions>): string => {
  if (dateValue) {
    return new Date(dateValue).toLocaleDateString(
      options?.locale || 'en-US',
      options?.dateFormatOptions || longDate,
    )
  }

  return '';
}

export default formatDate;