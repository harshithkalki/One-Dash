interface Item {
    createdAt: string | Date;
}

export function mergeSortedArrays<T, K, I>(arr1: (T & Item)[], arr2: (K & Item)[], arr3: (I & Item)[]) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const d: (T | K | I)[] = new Array(arr1.length + arr2.length + arr3.length);
    let i = 0;
    let j = 0;
    let k = 0;

    for (let l = 0; l < arr1.length + arr2.length + arr3.length; l++) {

        const ele1 = arr1[i];
        const ele2 = arr2[j];
        const ele3 = arr3[k];


        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        d[l] = (i < arr1.length && (j >= arr2.length || (ele1 && ele2 && ele1?.createdAt < ele2?.createdAt))
            ? (k >= arr3.length || (ele1 && ele3 && ele1?.createdAt < ele3?.createdAt)
                ? arr1[i++]
                : arr3[k++])
            : (j < arr2.length && (k >= arr3.length || (ele2 && ele3 && ele2?.createdAt < ele3?.createdAt))
                ? arr2[j++]
                : arr3[k++]))!;
    }

    return d;
}
