'use client';
import { Invite } from '@sommhai/shared-type/src';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@sommhai/ui/components/ui/collapsible';
import { useState } from 'react';
import { CgProfile } from 'react-icons/cg';
import { IoChevronDownOutline } from 'react-icons/io5';

import { API_BASE_URL } from '@/env';

export function CollabsibleAccepted({ invites }: { invites: Invite[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const getUserName = (invite: Invite) => {
    fetch(`${API_BASE_URL}/users/${invite.userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('data', data);
        return data.username;
      })
      .catch((error) => {
        console.error('Error fetching user name:', error);
        return 'Unknown User';
      });
    return 'Unknown User';
  };
  return (
    <div className='rounded-24 bg-white-pure mx-auto mt-[19px] w-[345px] pb-[6px] pl-[16px] pr-[9px] pt-[8px]'>
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger className='flex w-full items-center justify-between'>
          <h1 className='text-semi-18'>Accept Invitation</h1>
          <div className='flex w-[44px] items-center gap-8'>
            <h1 className='text-semi-18 text-[#2ECC71]'>10</h1>
            <IoChevronDownOutline
              className={`mt-[3px] transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
            />
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent>
          {invites.map((invite) => (
            <div className='mt-12 flex gap-12'>
              <CgProfile className='mt-[3px]' />
              <h1 className='text-semi-18'>{getUserName(invite)}</h1>
            </div>
          ))}
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}

export function CollabsibleDenied({ invites }: { invites: Invite[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const getUserName = (invite: Invite) => {
    fetch(`${API_BASE_URL}/users/${invite.userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('data', data);
        return data.username;
      })
      .catch((error) => {
        console.error('Error fetching user name:', error);
        return 'Unknown User';
      });
    return 'Unknown User';
  };
  return (
    <div className='rounded-24 bg-white-pure mx-auto mt-[19px] w-[345px] pb-[6px] pl-[16px] pr-[9px] pt-[8px]'>
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger className='flex w-full items-center justify-between'>
          <h1 className='text-semi-18'>Denied Invitation</h1>
          <div className='flex w-[44px] items-center gap-8'>
            <h1 className='text-semi-18 text-[#E74C3C]'>10</h1>
            <IoChevronDownOutline
              className={`mt-[3px] transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
            />
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent>
          {invites.map((invite) => (
            <div className='mt-12 flex gap-12'>
              <CgProfile className='mt-[3px]' />
              <h1 className='text-semi-18'>{getUserName(invite)}</h1>
            </div>
          ))}
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
