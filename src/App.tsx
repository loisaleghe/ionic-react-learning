import React, { useRef, useState } from "react";
import {
  IonApp,
  IonHeader,
  IonContent,
  setupIonicReact,
  IonTitle,
  IonToolbar,
  IonItem,
  IonLabel,
  IonInput,
  IonGrid,
  IonRow,
  IonCol,
  IonAlert,
} from "@ionic/react";
import BmiControls from "./components/BmiControls";
import ResultCard from "./components/resultCard";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import InputControl from "./components/InputControl";

setupIonicReact();

const App: React.FC = () => {
  const [error, setError] = useState<string>();
  const [calculatedBmi, setCalculatedBmi] = useState<number>();
  const [calcUnits, setCalcUnits] = useState<"mkg" | "ftlbs">("mkg");

  // usually you just have useRef but because this is typescript, we added the HTMLIonInputElement & because Typescript doesn't know what it is linked to initially, we pass null
  const heightInput = useRef<HTMLIonInputElement>(null);
  const weightInput = useRef<HTMLIonInputElement>(null);

  const calculateBmi = () => {
    //when you ?. it is a shortcut for ternary operator that typescript creates for you to check for null values, if you're sure it's not needed you can change it to !.
    const enteredHeight = heightInput.current!.value;
    const enteredWeight = weightInput.current!.value;

    // putting if statement to just return if it is null/false and also checking if the weight and height are less than 0
    if (
      !enteredHeight ||
      !enteredWeight ||
      +enteredHeight < 0 ||
      +enteredWeight < 0
    ) {
      setError("Please enter a valid input number (non-negative input number)");
      return;
    }

    // let's do this formula for if the user puts ft/lbs
    const weightConversionFactor = calcUnits === "ftlbs" ? 2.2 : 1;
    const weight = +enteredWeight / weightConversionFactor;

    const heightConversionFactor = calcUnits === "ftlbs" ? 3.28 : 1;
    const height = +enteredHeight / heightConversionFactor;

    // remember we put + in front so that it takes a number as its type
    const bmi = weight / (height * height);

    setCalculatedBmi(bmi);
  };

  const resetBtn = () => {
    heightInput.current!.value = "";
    weightInput.current!.value = "";
    setCalculatedBmi(undefined);
  };

  const clearError = () => {
    setError("");
  };

  const selectCalcUnitHandler = (selectedValue: "mkg" | "ftlbs") => {
    setCalcUnits(selectedValue);
  };
  return (
    <React.Fragment>
      <IonAlert
        isOpen={!!error}
        message={error}
        buttons={[{ text: "Okay", handler: clearError }]}
        onDidDismiss={() => setError(error)}
      ></IonAlert>
      <IonApp>
        <IonHeader>
          <IonToolbar color="primary">
            <IonTitle>BMI Calculator</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonGrid>
            <IonRow>
              <IonCol>
                <InputControl
                  selectedValue={calcUnits}
                  onSelectValue={selectCalcUnitHandler}
                />
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel position="floating">
                    Your Height ({calcUnits === "mkg" ? "meters" : "feet"})
                  </IonLabel>
                  <IonInput type="number" ref={heightInput}></IonInput>
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel position="floating">
                    Your Weight ({calcUnits === "mkg" ? "kg" : "lbs"})
                  </IonLabel>
                  <IonInput type="number" ref={weightInput}></IonInput>
                </IonItem>
              </IonCol>
            </IonRow>
            <BmiControls calcBmi={calculateBmi} resetBttn={resetBtn} />

            {calculatedBmi && <ResultCard calcBmiResult={calculatedBmi} />}
          </IonGrid>
        </IonContent>
      </IonApp>
    </React.Fragment>
  );
};

export default App;
