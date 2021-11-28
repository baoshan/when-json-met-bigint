/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/naming-convention */
import JSB from "index";

describe(`Testing parser schema`, function () {
    it(`should respect schema`, function () {
        const JSONbig = JSB;
        expect(typeof JSONbig.parse(`123`, null, `bigint`)).toEqual(`bigint`);
        expect(typeof JSONbig.parse(`{"a": {"b": 123} }`, null, { a: { b: `bigint` } }).a.b).toEqual(
            `bigint`,
        );
        expect(() => {
            JSONbig.parse(`{"a": {"b": 123} }`, null, {
                a: {
                    b: (n: string) => {
                        if (n === `123`) throw new Error(`cannot be 123`);
                        return `number`;
                    },
                },
            });
        }).toThrow(`cannot be 123`);

        const o = JSONbig.parse(`{"a": [1, 2, 3] }`, null, { a: [`bigint`] });
        expect(typeof o.a[0]).toEqual(`bigint`);
        expect(typeof o.a[1]).toEqual(`bigint`);
        expect(typeof o.a[2]).toEqual(`bigint`);

        const o1 = JSONbig.parse(`{"a": [1, 2, 3] }`, null, { a: [`bigint`, `bigint`] });
        expect(typeof o1.a[0]).toEqual(`bigint`);
        expect(typeof o1.a[1]).toEqual(`bigint`);

        const o2 = JSONbig.parse(`{"a": [1, 2, 3] }`, null, { a: [`bigint`, null] });
        expect(typeof o2.a[0]).toEqual(`bigint`);

        const o3 = JSONbig.parse(`{"a": [1, 2, 3] }`, null, { a: [null, null, `bigint`] });
        expect(typeof o3.a[2]).toEqual(`bigint`);
    });
});