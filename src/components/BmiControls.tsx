import React from "react";
import { IonRow, IonCol, IonButton, IonIcon } from "@ionic/react";
import { calculatorOutline, refreshOutline } from "ionicons/icons";

const BmiControls: React.FC<{ calcBmi: () => void; resetBttn: () => void }> = (
  props
) => {
  return (
    <IonRow>
      <IonCol className="ion-text-left">
        <IonButton onClick={props.calcBmi}>
          <IonIcon slot="start" icon={calculatorOutline} />
          Calculate
        </IonButton>
      </IonCol>
      <IonCol className="ion-text-right">
        <IonButton fill="outline" onClick={props.resetBttn}>
          <IonIcon slot="start" icon={refreshOutline} />
          Reset
        </IonButton>
      </IonCol>
    </IonRow>
  );
};

export default BmiControls;
