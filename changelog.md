#1.13.0
* components/DeliveyListItem
  * open payments print dialog

* container/DeliveryList
  * getDeliveryByPrepayedStateSorter()
    * fixed soert algorithm

* reducers/deliverListItemStatus
  * getOpenPaymentsStatus()
    * fixed label content handling for new payments

* constants/users
  * update

* toosl/sortByDeliveryState
  * fixed sort algorithm

#1.12.0
* show new payments

* reducer/deliveryItemStatus
  * Bugfix: prepayed items displayed yellow

* fixed https://tree.taiga.io/project/jwendel-ahr/issue/126
* cleanup and refactor

* actions/actionTypes
  * added MOVE_CCVEHICLE_EDITINGPLUS_*
  * added MOVE_CCVEHICLE_INSALE_*
  * added MOVE_CCVEHICLE_SOLD_*

* action/moveCcVehicle
  * added

* components/ContractData/DlgConfirmPrepayed
  * added ccVehicleId to confirm callback

* components/SelectDeliveryType
  * added tooltips on counter bubbles

* container/ContractData/
  * confirmPrepayed()
    * dispatch moveVehicleToInsale() after saveContractDelivery()
    * currently disabled

  

#1.11.0
* actions/deliveryDetails
  * fetchOpenPayments()
    * consider contract bills

* actions/deliveryItemStatus
  * fetchOpenPayments()
    * consider contract bills

* components/DeliveryStatus
  * new

* components/ContractData
  * added DeliveryStatus

* components/DeliveryList
  * readded seller

* components/DeliveryListItem
  * added item status indicator
  * readded seller

* components/SelectDeliveryType
  * added item counter

* container/CustomerPayments
  * container adapter changed fetchOpenPayements

* container/SelectDeliveryType
  * added item counter

* reducers/deliveryItemStatus
  * added getPaymentsStatus()

* reducers/deliveryList
  * FETCH_DELIVERY_LIST_SUCC
    * calc overdue date

* tools/formatDate
  * removed seconds from output


#1.10.0
* DeliveryList
  * seperate by delivery type

* DeliveryDetails
  * show via Overlay instead of route change
  * added DeliveryStatus

#1.9.0
* Liste
  * handle product sale

* Details
  * handle product sale

* Details - Con^tract
  * show reg doc location

* Details - Registration
  * bug fix - save tracking ID

#1.8.0
* Delivery Comments
  * add new comments

#1.7.0
* Aufträge
  * Zulassung rausgenommen

* ContractData
  * added delivery comments
  * restructured and cleaned up
  * show bank name

#1.6.0
* Delivery Item Status 
  * refactor
  * bugfix
  * wenn Zulassung gewählt ist, dann wird angezeigt wenn FZ beim TÜV

#1.5.0
* Delivery Item Status 
  * Status relevante API-Requests zu einem zusammengefasst

#1.4.0
* Details - documents 
  * added confirmation switch

* List
  * added status-check for documents
  * added status-check for registration

* Details - registration
  * added status-check

#1.3.0
* added documents
* added registration
* added task list
* better error handling when fetch fails
* added app version number

#1.2.0
* added perquisites to details page
* added payment plan to details page
* added payments to details page

#1.1.0
* enabled search function

#1.0.0
* initial setup
