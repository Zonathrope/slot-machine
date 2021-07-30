/* eslint-disable no-unused-vars */
/* eslint-disable eqeqeq */
import React, { useState, useRef } from "react"

function App() {
    const [balance, setBalance] = useState(1000)
    const [fruit1, setFruit1] = useState("🍒");
    const [fruit2, setFruit2] = useState("🍒");
    const [fruit3, setFruit3] = useState("🍒");
    const [rolling, setRolling] = useState(false);

    const [bid1, setBid1] = useState(true)
    const [bid2, setBid2] = useState(false)
    const [bid3, setBid3] = useState(false)

    const [bidAmount, setBidAmount] = useState(10)
    let slotRef = [useRef(null), useRef(null), useRef(null)];
    const fruits = ["🍒", "🍉", "🍊", "🍓", "🍇", "🥝"]

    const roll = () => {
        setBalance(balance - bidAmount)
        setRolling(true);
        setTimeout(() => {
            setRolling(false);
        }, 700);

        slotRef.forEach((slot, i) => {
            const selected = triggerSlotRotation(slot.current);
            if (i + 1 == 1)
                setFruit1(selected);
            else if (i + 1 == 2)
                setFruit2(selected);
            else
                setFruit3(selected);
        });


        let first = +slotRef[0].current.style.top.slice(0, -2)
        let second = +slotRef[1].current.style.top.slice(0, -2)
        let third = +slotRef[2].current.style.top.slice(0, -2)
        if (first === second && first === third && second === third) {
            setBalance(balance + bidAmount * 3)
        }

    };

    const triggerSlotRotation = ref => {
        function setTop(top) {
            ref.style.top = `${top}px`;
        }
        let options = ref.children;
        let randomOption = Math.floor(
            Math.random() * fruits.length
        );
        let choosenOption = options[randomOption];
        setTop(-choosenOption.offsetTop + 2);
        return fruits[randomOption];
    };

    function changeBid1() {
        setBidAmount(10)
        setBid1(true)
        setBid2(false)
        setBid3(false)
    }

    function changeBid2() {
        setBidAmount(50)
        setBid1(false)
        setBid2(true)
        setBid3(false)
    }

    function changeBid3() {
        setBidAmount(100)
        setBid1(false)
        setBid2(false)
        setBid3(true)
    }

    return (
        <>
            <div className="wrapper">
                <div className="balance">Your balance:<p>{balance}</p></div>
                <div className="SlotMachine">
                    <div className="slot">
                        <section>
                            <div className="container" ref={slotRef[0]}>
                                {fruits.map((fruit, i) => (
                                    <div key={i}>
                                        <span>{fruit}</span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>
                    <div className="slot">
                        <section>
                            <div className="container" ref={slotRef[1]}>
                                {fruits.map(fruit => (
                                    <div>
                                        <span>{fruit}</span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>
                    <div className="slot">
                        <section>
                            <div className="container" ref={slotRef[2]}>
                                {fruits.map(fruit => (
                                    <div>
                                        <span>{fruit}</span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>
                    <div
                        className={!rolling ? "roll rolling" : "roll"}
                        onClick={!rolling ? roll : undefined}
                        disabled={rolling}>
                        {rolling ? "Rolling..." : "ROLL"}
                    </div>
                </div>
                <div className="bid-row">
                    <div className={bid1 ? 'bid clicked' : 'bid'} onClick={changeBid1}>10</div>
                    <div className={bid2 ? 'bid clicked' : 'bid'} onClick={changeBid2}>50</div>
                    <div className={bid3 ? 'bid clicked' : 'bid'} onClick={changeBid3}>100</div>
                </div>
            </div>
        </>
    );
};

export default App;
