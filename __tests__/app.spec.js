import {mount} from '@vue/test-utils';
import App from '../src/components/RecordsTable.vue';

describe('banking_app', () => {
    let wrapper, submitButton, recordsBody, input, amountHeader;

    const getByTestId = (wrapper, id) => {
        return wrapper.find(`[data-testid="${id}"]`)
    }

    const IDS = {
        SUBMIT_BUTTON: 'submit-button',
        RECORDS_BODY: 'records-body',
        INPUT: 'app-input',
        AMOUNT_HEADER: 'amount'
    }

    beforeEach(() => {
        wrapper = mount(App, {
            props : {
                transactions: [
                    {
                        date: '2019-12-01',
                        description: 'THE HACKERUNIVERSITY DES: CCD+ ID:0000232343',
                        type: 0,
                        amount: 1000,
                        balance: '$12,234.45'
                    },
                    {
                        date: '2019-11-25',
                        description: 'HACKERBANK DES:DEBIT O ID: 0000987945787897987987',
                        type: 1,
                        amount: 2450.45,
                        balance: '$12,234.45'
                    },
                    {
                        date: '2019-11-29',
                        description: 'HACKERBANK DES: CREDIT O ID:1223232323',
                        type: 1,
                        amount: 999,
                        balance: '$10,928'
                    },
                    {
                        date: '2019-12-03',
                        description: 'HACKERBANK INC. DES:CCD+ ID: 33375894749',
                        type: 0,
                        amount: 1985.4,
                        balance: '$12,234.45'
                    },
                    {
                        date: '2019-11-29',
                        description: 'HACKERBANK1 BP DES: MERCH PMT ID:1358570',
                        type: 0,
                        amount: 1520.34,
                        balance: '$12,234.45'
                    },
                    {
                        date: '2019-11-29',
                        description: 'HACKERBANK DES: DEBIT O ID:00097494729',
                        type: 0,
                        amount: 564,
                        balance: '$12,234.45'
                    },
                    {
                        date: '2019-11-30',
                        description: 'CREDIT CARD PAYMENT ID: 222349083',
                        type: 1,
                        amount: 1987,
                        balance: '$12,234.45'
                    }
                ]
            }
        });
        submitButton = getByTestId(wrapper, IDS.SUBMIT_BUTTON);
        recordsBody = getByTestId(wrapper, IDS.RECORDS_BODY);
        input = getByTestId(wrapper, IDS.INPUT);
        amountHeader = getByTestId(wrapper, IDS.AMOUNT_HEADER);
    })

    it('should render the initial UI as expected', () => {
        expect(input.value).toBeFalsy()
        expect(submitButton.element.innerHTML).toEqual('Filter');
        expect(recordsBody).toBeTruthy();
        const records = recordsBody.findAll('tr');
        expect(records.length).toEqual(7);
        records.forEach((record, i) => {
            const tds = record.findAll('td');
            if (i === 0) {
                expect(tds[1].element.innerHTML).toEqual('THE HACKERUNIVERSITY DES: CCD+ ID:0000232343');
            } else if (i === 3) {
                expect(tds[1].element.innerHTML).toEqual('HACKERBANK INC. DES:CCD+ ID: 33375894749');
            } else if (i === 4) {
                expect(tds[1].element.innerHTML).toEqual('HACKERBANK1 BP DES: MERCH PMT ID:1358570');
            }
        })
    });

    it('should filter the data by initial date', async () => {
        await input.setValue('2019-11-29');
        await submitButton.trigger('click');
        let records = recordsBody.findAll('tr');
        expect(records.length).toEqual(3);
        records.forEach((record, i) => {
            const tds = record.findAll('td');
            if (i === 0) {
                expect(tds[1].element.innerHTML).toEqual('HACKERBANK DES: CREDIT O ID:1223232323');
            } else if (i === 1) {
                expect(tds[1].element.innerHTML).toEqual('HACKERBANK1 BP DES: MERCH PMT ID:1358570');
            }
        })
    })

    it('should sort the data on clicking the header', async () => {
        await amountHeader.trigger('click');
        let records = recordsBody.findAll('tr');
        expect(records.length).toEqual(7);
        records.forEach((record, i) => {
            const tds = record.findAll('td');
            if (i === 0) {
                expect(tds[1].element.innerHTML).toEqual('HACKERBANK DES: DEBIT O ID:00097494729');
            } else if (i === 2) {
                expect(tds[1].element.innerHTML).toEqual('THE HACKERUNIVERSITY DES: CCD+ ID:0000232343');
            }
        })
    })

    it('should show the correct data when sort and filter are done together', async () => {
        await input.setValue('2019-11-29');
        await submitButton.trigger('click');
        await amountHeader.trigger('click');
        let records = recordsBody.findAll('tr');
        expect(records.length).toEqual(3);
        records.forEach((record, i) => {
            const tds = record.findAll('td');
            if (i === 0) {
                expect(tds[1].element.innerHTML).toEqual('HACKERBANK DES: DEBIT O ID:00097494729');
            } else if (i === 2) {
                expect(tds[1].element.innerHTML).toEqual('HACKERBANK1 BP DES: MERCH PMT ID:1358570');
            }
        })
    })

    it('should not filter data when date is not selected', async () => {
        await input.setValue('');
        await submitButton.trigger('click');
        let records = recordsBody.findAll('tr');
        expect(records.length).toEqual(7);
        records.forEach((record, i) => {
            const tds = record.findAll('td');
            if (i === 0) {
                expect(tds[1].element.innerHTML).toEqual('THE HACKERUNIVERSITY DES: CCD+ ID:0000232343');
            } else if (i === 3) {
                expect(tds[1].element.innerHTML).toEqual('HACKERBANK INC. DES:CCD+ ID: 33375894749');
            }
        })
    })
});
