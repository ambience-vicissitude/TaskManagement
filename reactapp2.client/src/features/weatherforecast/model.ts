/**
 * Forecast Model File
 * - responsible for weather forecast domain model
 * 
 * @updated Sep 2025
 * @author bling
 */

export default interface Forecast {
    date: string;
    temperatureC: number;
    temperatureF: number;
    summary: string;
}
