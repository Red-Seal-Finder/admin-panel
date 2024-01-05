import { IContractorsDetails, ICustomerData, ISubAdmin } from "../types";

export function findSmallestYear(
  arrayOfObjects: ICustomerData[] | ISubAdmin[]
) {
  if (arrayOfObjects.length === 0) {
    return null; // Return null if the array is empty
  }

  let smallestDate = new Date(arrayOfObjects[0].createdAt);
  let smallestYear = smallestDate.getFullYear();

  for (let i = 1; i < arrayOfObjects.length; i++) {
    const currentDate = new Date(arrayOfObjects[i].createdAt);
    if (currentDate < smallestDate) {
      smallestDate = currentDate;
      smallestYear = currentDate.getFullYear();
    }
  }

  return smallestYear;
}

export function findLargestYear(arrayOfObjects: ICustomerData[] | ISubAdmin[]) {
  if (arrayOfObjects.length === 0) {
    return null; // Return null if the array is empty
  }

  let largestDate = new Date(arrayOfObjects[0].createdAt);
  let largestYear = largestDate.getFullYear();

  for (let i = 1; i < arrayOfObjects.length; i++) {
    const currentDate = new Date(arrayOfObjects[i].createdAt);
    if (currentDate > largestDate) {
      largestDate = currentDate;
      largestYear = currentDate.getFullYear();
    }
  }

  return largestYear;
}

export function findContractorsSmallestYear(
  arrayOfObjects: IContractorsDetails[]
) {
  if (arrayOfObjects.length === 0) {
    return null; // Return null if the array is empty
  }

  let smallestDate = new Date(arrayOfObjects[0].contractorProfile.createdAt);
  let smallestYear = smallestDate.getFullYear();

  for (let i = 1; i < arrayOfObjects.length; i++) {
    const currentDate = new Date(arrayOfObjects[i].contractorProfile.createdAt);
    if (currentDate < smallestDate) {
      smallestDate = currentDate;
      smallestYear = currentDate.getFullYear();
    }
  }

  return smallestYear;
}

export function findContractorsLargestYear(
  arrayOfObjects: IContractorsDetails[]
) {
  if (arrayOfObjects.length === 0) {
    return null; // Return null if the array is empty
  }

  let largestDate = new Date(arrayOfObjects[0].contractorProfile.createdAt);
  let largestYear = largestDate.getFullYear();

  for (let i = 1; i < arrayOfObjects.length; i++) {
    const currentDate = new Date(arrayOfObjects[i].contractorProfile.createdAt);
    if (currentDate > largestDate) {
      largestDate = currentDate;
      largestYear = currentDate.getFullYear();
    }
  }

  return largestYear;
}
