import { useState } from 'react'
import { RadioGroup } from '@headlessui/react'
import { useDispatch, useSelector } from 'react-redux'
import { setPlan } from '../redux/ui-slice'

// const plans = [

//     {
//         "id": "price_1NVbYcKrjQpaXbt1z0AKBeZW",
//         "currency": "usd",
//         "interval": "month",
//         "productName": "ProPlus",
//         "price": 30
//     },
//     {
//         "id": "price_1NVbY8KrjQpaXbt1SPOSled8",
//         "currency": "usd",
//         "interval": "month",
//         "productName": "Pro",
//         "price": 20
//     },
//     {
//         "id": "price_1NQTbuKrjQpaXbt1np7NdzVy",
//         "currency": "usd",
//         "interval": "month",
//         "productName": "10 Tokens",
//         "price": 10
//     }

// ]

export default function PlansCheckBox({ plans, selected, setSelected }) {
    const { user } = useSelector((state) => state.auth)

    const dispatch = useDispatch()

    return (
        <div className="w-full px-4 py-4">
            <div className="mx-auto w-full max-w-md">
                <RadioGroup value={selected} onChange={setSelected}>
                    <RadioGroup.Label className="sr-only">Server size</RadioGroup.Label>
                    <div className="space-y-2">
                        {plans.filter((plan) => plan.id !== user.planId).map((plan) => (
                            <RadioGroup.Option
                                key={plan.name}
                                value={plan}
                                className={({ active, checked }) =>
                                    `${active
                                        ? 'ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-300'
                                        : ''
                                    }
                  ${checked ? 'bg-blue-900 bg-opacity-75 text-white' : 'bg-white'
                                    }
                    relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none`
                                }
                            >
                                {({ active, checked }) => (
                                    <>
                                        <div className="flex w-full items-center justify-between" onClick={() => dispatch(setPlan(plan))}>
                                            <div className="flex items-center" >
                                                <div className="text-sm">
                                                    <RadioGroup.Label
                                                        as="p"
                                                        className={`font-medium  ${checked ? 'text-white' : 'text-gray-900'
                                                            }`}
                                                    >
                                                        {plan.productName}
                                                    </RadioGroup.Label>
                                                    <RadioGroup.Description
                                                        as="span"
                                                        className={`inline ${checked ? 'text-blue-100' : 'text-gray-500'
                                                            }`}
                                                    >
                                                        <span>
                                                            {plan.currency}    {plan.price} / {plan.interval}
                                                        </span>{' '}
                                                        {/* <span aria-hidden="true">&middot;</span>{' '} */}

                                                    </RadioGroup.Description>
                                                </div>
                                            </div>
                                            {checked && (
                                                <div className="shrink-0 text-white">
                                                    <CheckIcon className="h-6 w-6" />
                                                </div>
                                            )}
                                        </div>
                                    </>
                                )}
                            </RadioGroup.Option>
                        ))}
                    </div>
                </RadioGroup>
            </div>
        </div>
    )
}

function CheckIcon(props) {
    return (
        <svg viewBox="0 0 24 24" fill="none" {...props}>
            <circle cx={12} cy={12} r={12} fill="#fff" opacity="0.2" />
            <path
                d="M7 13l3 3 7-7"
                stroke="#fff"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}
