import { atom } from "jotai";

export const screenAtom = atom("main");
export const cameraTakenImageAtom = atom("");

export const questionAtom = atom("");
export const answerAtom = atom({ imageUrl: "", text: "" });
