import { nanoid } from 'nanoid';
import { Country } from './App';

export default function CountryCard({ country }: { country: Country }) {
    const languages = Object.values(country.languages);
    return (
        <div>
            <h2>{country.name.common}</h2>
            Capital: {country.capital.join(', ')}
            <br />
            <br />
            Language{languages.length > 1 ? 's' : ''}:
            <ul>
                {languages.map((language) => (
                    <li key={nanoid()}>{language}</li>
                ))}
            </ul>
        </div>
    );
}
