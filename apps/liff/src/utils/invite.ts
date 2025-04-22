import liff from '@line/liff';

import { LIFF_ID, LIFF_URL } from '@/env';

export async function inviteAttendee(eventId: string) {
  const result = await liff.init({ liffId: LIFF_ID }).then(() =>
    liff.shareTargetPicker([
      {
        type: 'flex',
        altText: 'Invite to event',
        contents: {
          type: 'bubble',
          size: 'mega',
          body: {
            type: 'box',
            layout: 'vertical',
            spacing: 'md',
            contents: [
              {
                type: 'box',
                layout: 'horizontal',
                contents: [
                  {
                    type: 'text',
                    text: 'Event title',
                    weight: 'bold',
                    size: 'xl',
                    flex: 1,
                  },
                  {
                    type: 'box',
                    layout: 'baseline',
                    contents: [
                      {
                        type: 'icon',
                        url: 'https://cdn-icons-png.flaticon.com/512/5343/5343102.png',
                        size: 'sm',
                        offsetTop: '2px',
                      },
                    ],
                    alignItems: 'flex-start',
                    justifyContent: 'flex-end',
                  },
                ],
                alignItems: 'center',
                justifyContent: 'space-between',
              },
              {
                type: 'box',
                layout: 'baseline',
                spacing: 'sm',
                contents: [
                  {
                    type: 'icon',
                    url: 'https://lh3.googleusercontent.com/d/1noOrCIc0whD78F_UZ61wYedyiGEocmSx',
                    size: 'sm',
                    offsetTop: '1px',
                  },
                  {
                    type: 'text',
                    text: 'Rounded Timer',
                    size: 'md',
                    color: '#F6BB0A',
                    weight: 'regular',
                  },
                ],
              },
              {
                type: 'text',
                text: 'Event details',
                color: '#575757',
                size: 'sm',
              },
              {
                type: 'image',
                url: 'https://lh3.googleusercontent.com/d/1-KrDjTQiQGG3aF9bLH32nyqIX9fQuv5B',
                size: 'full',
                aspectMode: 'fit',
              },
            ],
          },
          footer: {
            type: 'box',
            layout: 'vertical',
            contents: [
              {
                type: 'button',
                style: 'primary',
                action: {
                  type: 'uri',
                  label: 'View',
                  uri: `${LIFF_URL}/attendee/event/${eventId}`,
                },
                height: 'sm',
                color: '#F6BB0A',
              },
            ],
            spacing: 'sm',
            paddingAll: '12px',
          },
        },
      },
    ]),
  );
  if (result) {
    console.log('ShareTargetPicker was successful');
  } else {
    const [majorVer, minorVer, patchVer] = (liff.getLineVersion() || '').split('.');

    if (minorVer === undefined) {
      alert('ShareTargetPicker was canceled in external browser');
      return;
    }
    if (parseInt(majorVer || '0') >= 10 && parseInt(minorVer || '0') >= 10 && parseInt(patchVer || '0') > 0) {
      alert('ShareTargetPicker was canceled in LINE app');
    }
  }
}
