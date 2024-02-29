import React from 'react';
import { Button } from '@radix-ui/themes';
import Link from 'next/link';

export default function IssuesPage() {
   return (
      <div>
         <p>Issues Page</p>
         <Button color="orange">
            <Link href="/issues/new">New Issue</Link>
         </Button>
      </div>
   );
}