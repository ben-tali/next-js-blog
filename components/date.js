import { format, parseISO } from 'date-fns';

export default function PostDate ( { datestring } ) {
  const date = parseISO( datestring );

  return <time dateTime={ datestring }>{ format( date, 'LLLL d, yyyy' ) } </time>
}