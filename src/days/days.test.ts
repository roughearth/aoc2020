import { Days } from '.';
import { safetyNet } from '../utils';

describe.each([
// day,  part 1 answer  , part 2 answer
  [ 1 ,  870331         , 283025088                                            ],
  [ 2 ,  396            , 428                                                  ],
  [ 3 ,  230            , 9533698720                                           ],
  [ 4 ,  233            , 111                                                  ],
  [ 5 ,  994            , 741                                                  ],
  [ 6 ,  6726           , 3316                                                 ],
  [ 7 ,  265            , 14177                                                ],
  [ 8 ,  1723           , 846                                                  ],
  [ 9 ,  675280050      , 96081673                                             ],
  [ 10,  2376           , 129586085429248                                      ],
  [ 11,  2368           , 2124                                                 ],
  [ 12,  923            , 24769                                                ],
  [ 13,  174            , 780601154795940                                      ],
  [ 14,  6386593869035  , 4288986482164                                        ],
  [ 15,  468            , 1801753                                              ],
  [ 16,  20058          , 366871907221                                         ],
  [ 17,  301            , 2424                                                 ],
  [ 18,  14006719520523 , 545115449981968                                      ],
  [ 19,  265            , 394                                                  ],
  [ 20,  79412832860579 , 2155                                                 ],
  [ 21,  1977           , "dpkvsdk,xmmpt,cxjqxbt,drbq,zmzq,mnrjrf,kjgl,rkcpxs" ],
  [ 22,  33925          , 33441                                                ],
  [ 23,  "76385429"     , 12621748849                                          ],
  [ 24,  300            , 3466                                                 ],
  [ 25,  711945         , "Merry Xmas!"                                        ]
])("Day %i", (d: number, ans1?: number | string, ans2?: number | string) => {
  const day = Days[`day${d}`];

  if (ans1) {
    test("Part 1", () => {
      expect(day.part1(safetyNet())).toEqual(ans1);
    });
  }

  if (ans2) {
    test("Part 2", () => {
      expect(day.part2(safetyNet())).toEqual(ans2);
    });
  }
})