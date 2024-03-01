import React, { PropsWithChildren } from 'react';
import { Text } from '@radix-ui/themes';

/**
 * Error Message component that accepts props with children and checks whether children are falsy or not.
 * 
 * If so, renders 'null', otherwise renders an error component with message passed as a prop' 
 * @param children 
 * @returns Error component or 'null'
 */
export default function ErrorMessage({ children }: PropsWithChildren) {
   if (!children) return null;

   return (
      <Text color="red" as="p" className='text-sm'>{children}</Text>
   );
}


// /* another way to do this */
// interface Props {
//    children: React.ReactNode
// }

// export default function ErrorMessage({ children }: Props) {
//    return (
//       <div>ErrorMessage</div>
//    );
// }