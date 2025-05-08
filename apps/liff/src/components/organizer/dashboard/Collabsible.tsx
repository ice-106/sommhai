'use client';
import { Answer, Invite } from '@sommhai/shared-type/src';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@sommhai/ui/components/ui/collapsible';
import { useState } from 'react';
import { useEffect } from 'react';
import { CgProfile } from 'react-icons/cg';
import { IoChevronDownOutline, IoCloseOutline } from 'react-icons/io5';

import { API_BASE_URL } from '@/env';

export function CollabsibleAccepted({
  invites,
  answers,
  searchQuery,
}: {
  invites: Invite[];
  answers: Answer[];
  searchQuery: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [userNames, setUserNames] = useState<Record<string, string>>({});
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [filteredInvites, setFilteredInvites] = useState<Invite[]>(invites);

  // Group answers by user ID
  const answersByUser: Record<string, Answer[]> = {};

  // Process answers to group by user
  answers.forEach((answer) => {
    answer.responses.forEach((response) => {
      if (!answersByUser[response.uid]) {
        answersByUser[response.uid] = [];
      }
      answersByUser[response.uid]?.push(answer);
    });
  });

  const getUserAnswer = (userId: string, answer: Answer) => {
    const response = answer.responses.find((r) => r.uid === userId);
    return response ? response.answer : 'No answer provided';
  };

  const getUserName = (invite: Invite) => {
    return userNames[invite.userId] || 'Loading...';
  };

  useEffect(() => {
    invites.forEach((invite) => {
      fetch(`${API_BASE_URL}/users/${invite.userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setUserNames((prev) => ({
            ...prev,
            [invite.userId]: data.username,
          }));
        })
        .catch((error) => {
          console.error('Error fetching user name:', error);
          setUserNames((prev) => ({
            ...prev,
            [invite.userId]: 'Unknown User',
          }));
        });
    });
  }, [invites]);

  useEffect(() => {
    if (!searchQuery || searchQuery.trim() === '') {
      setFilteredInvites(invites);
    } else {
      const filtered = invites.filter((invite) => {
        const username = userNames[invite.userId]?.toLowerCase() || '';
        return username.includes(searchQuery.toLowerCase());
      });
      setFilteredInvites(filtered);
    }
  }, [searchQuery, invites, userNames]);

  return (
    <div className='flex w-full items-center justify-center px-24'>
      <div className='rounded-24 bg-white-pur mx-auto mt-[19px] w-full pb-[6px] pl-[16px] pr-[9px] pt-[8px] shadow-md'>
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <CollapsibleTrigger className='flex w-full items-center justify-between'>
            <h1 className='text-semi-18'>Accept Invitation</h1>
            <div className='flex w-[44px] items-center gap-8'>
              <h1 className='text-semi-18 text-[#2ECC71]'>{invites.length}</h1>
              <IoChevronDownOutline
                className={`mt-[3px] transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
              />
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent>
            {filteredInvites.length > 0 && (
              <div>
                {filteredInvites.map((invite) => (
                  <div
                    className='mt-12 flex cursor-pointer gap-12 rounded-md p-1 hover:bg-gray-50'
                    key={invite.userId}
                    onClick={() => setSelectedUser(invite.userId)}
                  >
                    <CgProfile className='mt-[3px]' />
                    <h1 className='text-semi-18'>{getUserName(invite)}</h1>
                  </div>
                ))}
              </div>
            )}
          </CollapsibleContent>
        </Collapsible>
        {selectedUser && (
          <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
            <div className='bg-orange-6 max-h-[80vh] w-full max-w-md overflow-y-auto rounded-lg bg-[url(/create-bg.svg)] p-6'>
              <div className='mb-4 flex items-center justify-between'>
                <h2 className='text-2xl font-semibold'>{userNames[selectedUser]}'s Answers</h2>
                <button className='text-gray-500 hover:text-gray-700' onClick={() => setSelectedUser(null)}>
                  <IoCloseOutline size={24} />
                </button>
              </div>

              <div className='space-y-4'>
                {answersByUser[selectedUser] && answersByUser[selectedUser].length > 0 ? (
                  answersByUser[selectedUser].map((answer) => (
                    <div className='bg-white-bg rounded-lg border-l-2 border-gray-200 pl-3' key={answer.qid}>
                      <p className='text-xl font-medium'>Question: {answer.question}</p>
                      <p className='mt-1 text-lg'>Answer: {getUserAnswer(selectedUser, answer)}</p>
                    </div>
                  ))
                ) : (
                  <p>No answers available for this user.</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export function CollabsibleDenied({ invites, searchQuery }: { invites: Invite[]; searchQuery: string }) {
  const [filteredInvites, setFilteredInvites] = useState(invites);
  const [isOpen, setIsOpen] = useState(false);
  const [userNames, setUserNames] = useState<Record<string, string>>({});
  useEffect(() => {
    invites.forEach((invite) => {
      fetch(`${API_BASE_URL}/users/${invite.userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setUserNames((prev) => ({
            ...prev,
            [invite.userId]: data.username,
          }));
        })
        .catch((error) => {
          console.error('Error fetching user name:', error);
          setUserNames((prev) => ({
            ...prev,
            [invite.userId]: 'Unknown User',
          }));
        });
    });
  }, [invites]);

  useEffect(() => {
    if (!searchQuery || searchQuery.trim() === '') {
      setFilteredInvites(invites);
    } else {
      const filtered = invites.filter((invite) => {
        const username = userNames[invite.userId]?.toLowerCase() || '';
        return username.includes(searchQuery.toLowerCase());
      });
      setFilteredInvites(filtered);
    }
  }, [searchQuery, invites, userNames]);

  return (
    <div className='flex w-full items-center justify-center px-24'>
      <div className='rounded-24 bg-white-pure mx-auto mt-[19px] w-full pb-[6px] pl-[16px] pr-[9px] pt-[8px] shadow-md'>
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <CollapsibleTrigger className='flex w-full items-center justify-between'>
            <h1 className='text-semi-18'>Denied Invitation</h1>
            <div className='flex w-[44px] items-center gap-8'>
              <h1 className='text-semi-18 text-[#E74C3C]'>{invites.length}</h1>
              <IoChevronDownOutline
                className={`mt-[3px] transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
              />
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent>
            {filteredInvites.length > 0 && (
              <div>
                {filteredInvites.map((invite) => (
                  <div className='mt-12 flex gap-12'>
                    <CgProfile className='mt-[3px]' />
                    <h1 className='text-semi-18'>{userNames[invite.userId] || 'Loading...'}</h1>
                  </div>
                ))}
              </div>
            )}
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  );
}
