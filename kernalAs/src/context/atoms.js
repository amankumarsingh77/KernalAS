// atoms.js

import { atom } from 'recoil';

export const user = atom({
    key: 'user',
    default: "",
});

export const isDropEnabled = atom({
    key: "isDropEnabled",
    default: true
})

export const fileType = atom({
    key: "filetype",
    default: ""
})