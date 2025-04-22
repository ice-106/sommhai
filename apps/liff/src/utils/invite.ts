import liff from '@line/liff';

import { LIFF_ID } from '@/env';

export async function inviteAttendee() {
  const result = await liff.init({ liffId: LIFF_ID }).then(() =>
    liff.shareTargetPicker([
      {
        type: 'text',
        text: 'Hello, this is a test message from LIFF.',
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
