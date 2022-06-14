import axios from 'axios';

import { EventsApiResponse, EventDetailsApiResponse } from './../types/Event.type';

export type FetchEventsApiParams = {
  page: number;
}

const defaultApiParams = {
  page: 1,
}

const baseUrl = 'http://127.0.0.1:8001/api';

export const getEvents = async (apiParams: FetchEventsApiParams = defaultApiParams) => {
  const { data } = await axios.get<EventsApiResponse>(`${baseUrl}/events`, { params: apiParams });

  return data;
}

export const getEventDetails = async (eventId: number) => {
  const { data } = await axios.get<EventDetailsApiResponse>(`${baseUrl}/events/${eventId}`);
  
  return data;
}

export const createEvent = async (formData: FormData) => {
  const { data } = await axios.post<EventDetailsApiResponse>(`${baseUrl}/events`, formData);
  
  return data;
}