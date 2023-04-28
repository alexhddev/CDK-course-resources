import { handler } from "../../../src/services/monitor/handler"


describe('Monitor handler test suite', () => {

    const fetchSpy = jest.spyOn(global, 'fetch');
    fetchSpy.mockImplementation(() => Promise.resolve({} as any));

    afterEach(()=>{
        jest.clearAllMocks();
    })

    test('makes requests for records in snsEvents', async () => {
        await handler({
            Records: [{
                Sns: {
                    Message: 'test message'
                }
            }]
        } as any, {});
        expect(fetchSpy).toHaveBeenCalledTimes(1);
        expect(fetchSpy).toHaveBeenCalledWith(expect.any(String), {
            method: 'POST',
            body: JSON.stringify({
                "text": `Huston, we have a problem: test message`
            })
        })
    });

    test('No sns records, no requests', async () => {
        await handler({
            Records: []
        } as any, {});
        expect(fetchSpy).not.toHaveBeenCalled();

    });

})